"use client";

import { useEffect } from "react";

/**
 * COMPLETE Google Translate Service Remover
 * 
 * This component PREVENTS Google Translate from loading at all by:
 * 1. Blocking script tags that load translate.google.com
 * 2. Removing any Google Translate elements immediately
 * 3. Preventing the service from initializing
 * 4. Overriding DOM methods to prevent injection
 */
export default function GoogleTranslateRemover() {
  useEffect(() => {
    // PREVENT Google Translate scripts from loading
    const preventScriptLoad = () => {
      // Block script tags with translate.google
      const scripts = document.querySelectorAll('script[src*="translate.google"]');
      scripts.forEach(script => {
        script.remove();
        script.parentElement?.remove();
      });

      // Override createElement to prevent script creation
      const originalCreateElement = document.createElement.bind(document);
      document.createElement = function(tagName: string, options?: any) {
        const element = originalCreateElement(tagName, options);
        if (tagName.toLowerCase() === 'script') {
          const originalSetAttribute = element.setAttribute.bind(element);
          element.setAttribute = function(name: string, value: string) {
            if (name === 'src' && value.includes('translate.google')) {
              console.warn('Blocked Google Translate script:', value);
              return; // Don't set the src
            }
            return originalSetAttribute(name, value);
          };
        }
        return element;
      };
    };

    // REMOVE all Google Translate elements
    const removeAllGoogleTranslate = () => {
      // Remove API
      if (typeof window !== 'undefined') {
        try {
          if ((window as any).google && (window as any).google.translate) {
            delete (window as any).google.translate;
          }
          // Prevent API creation
          Object.defineProperty(window, 'google', {
            get: () => ({}),
            set: () => {},
            configurable: false,
          });
        } catch (e) {}
      }

      // Remove ALL elements related to Google Translate
      const selectors = [
        'iframe[src*="translate.google"]',
        'div[id*="google_translate"]',
        'div[class*="goog-te"]',
        'select[id*="google_translate"]',
        '*[id*="google_translate"]',
        '*[class*="goog-te"]',
        '*[class*="google-translate"]',
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          el.remove();
          el.parentElement?.remove();
        });
      });

      // Remove any element with "Select Language" text
      document.querySelectorAll('*').forEach(el => {
        const text = el.textContent || (el as HTMLElement).innerText || '';
        const title = el.getAttribute('title') || '';
        const id = el.id || '';
        const className = el.className || '';

        if (
          (text.includes('Select Language') || text.includes('选择语言')) ||
          (title.includes('Select Language') || title.includes('Google Translate')) ||
          (id.includes('google') && id.includes('translate')) ||
          (className.includes('goog') && className.includes('te'))
        ) {
          // Check if it's our own LanguageSwitcher
          const isOurSwitcher = 
            el.closest('.language-switcher-container') ||
            el.closest('[data-our-language-switcher="true"]') ||
            el.closest('nav')?.querySelector('.language-switcher-container');
          
          if (!isOurSwitcher) {
            (el as HTMLElement).style.display = 'none';
            el.remove();
            el.parentElement?.remove();
          }
        }
      });
    };

    // Run immediately
    preventScriptLoad();
    removeAllGoogleTranslate();

    // Override appendChild and insertBefore to prevent injection
    const originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function(child: any) {
      if (child) {
        const src = child.src || child.getAttribute?.('src') || '';
        const id = child.id || child.getAttribute?.('id') || '';
        const className = child.className || child.getAttribute?.('class') || '';
        
        if (
          src.includes('translate.google') ||
          id.includes('google_translate') ||
          (typeof className === 'string' && (className.includes('goog-te') || className.includes('google-translate')))
        ) {
          console.warn('Blocked Google Translate element injection');
          return child; // Block
        }
      }
      return originalAppendChild.call(this, child);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function(newNode: any, referenceNode: any) {
      if (newNode) {
        const src = newNode.src || newNode.getAttribute?.('src') || '';
        const id = newNode.id || newNode.getAttribute?.('id') || '';
        const className = newNode.className || newNode.getAttribute?.('class') || '';
        
        if (
          src.includes('translate.google') ||
          id.includes('google_translate') ||
          (typeof className === 'string' && (className.includes('goog-te') || className.includes('google-translate')))
        ) {
          console.warn('Blocked Google Translate element insertion');
          return newNode; // Block
        }
      }
      return originalInsertBefore.call(this, newNode, referenceNode);
    };

    // MutationObserver to catch any new elements
    const observer = new MutationObserver(() => {
      preventScriptLoad();
      removeAllGoogleTranslate();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'id', 'class'],
    });

    // Periodic cleanup
    const interval = setInterval(() => {
      preventScriptLoad();
      removeAllGoogleTranslate();
    }, 200);

    // Cleanup
    return () => {
      clearInterval(interval);
      observer.disconnect();
      Node.prototype.appendChild = originalAppendChild;
      Node.prototype.insertBefore = originalInsertBefore;
      document.createElement = document.createElement.bind(document);
    };
  }, []);

  return null;
}

