# **Product Requirements Document (PRD)**

Project: Next Hardware Official Website  
Domain: NextHardware.io  
Version: 3.0 (Benchmark Edition)  
Status: Ready for Production

## **1\. Strategic Direction**

Goal: Build a community site that feels like a "Power Tool" for engineers.  
Design North Stars:

* **Linear.app:** For the "Magical" dark mode aesthetic and "Method" storytelling.  
* **Raycast:** For the "Engineer-First" utility (Command Palette vibe).  
* **Supabase:** For the high-energy "Launch" aesthetic.

## **2\. Core Functional Requirements**

### **2.1. The "Command Bar" Navigation (Ref: Raycast)**

* **Requirement:** Instead of a standard navbar, include a search-like input visual labeled "Search or Jump to..." (Visual only for V1, functional later).  
* **Purpose:** Signals that this site is built for keyboard-heavy engineers.

### **2.2. "The Method" Manifesto (Ref: Linear)**

* **Requirement:** A dedicated text section that explains our *philosophy* of hardware (e.g., "Atoms \> Bits").  
* **Design:** High-contrast typography, centered, manifesto style.

### **2.3. "Blueprints" Grid (Ref: Vercel)**

* **Requirement:** Interactive cards that look like "Starter Kits."  
* **Content:**  
  * *Spatial Kit:* AR/VR frameworks.  
  * *Embodied Kit:* Robotics & Sensors.  
  * *Edge Kit:* IoT & Silicon.  
* **Interaction:** Cards must have a subtle "glow" effect on hover (CSS box-shadow with color).

### **2.4. "Launch Mode" Event Widget (Ref: Supabase)**

* **Requirement:** The event section should not look like a calendar. It should look like a **Product Drop**.  
* **Elements:** Countdown timer, "Registration Open" status pill, limited capacity counter.

## **3\. Visual Specifications**

### **3.1. Color Palette ("The Matrix" meets "Linear")**

* **Background:** \#0B0F19 (Rich, deep navy-black).  
* **Accents:**  
  * *Electric Blue:* \#3B82F6 (Primary actions).  
  * *Signal Green:* \#10B981 (Status indicators/Online).  
  * *Raycast Red:* \#EF4444 (Errors/Offline).  
* **Borders:** Ultra-thin (1px), semi-transparent white (rgba(255,255,255,0.08)).

### **3.2. Typography (The "Terminal" Look)**

* **Headers:** *Inter* (Tight tracking, bold).  
* **Micro-copy:** *JetBrains Mono* (For dates, tags, status updates, and footer).

## **4\. Page Structure (Sitemap)**

1. **Hero:** "When Silicon Valley Software Meets Hardware." (Big, bold, centered).  
2. **Social Proof:** Infinite scroll of member companies (Google, NVIDIA, etc.).  
3. **The Philosophy:** "Why we build." (Linear-style text block).  
4. **Blueprints (The Stack):** 3-Column Grid of focus areas.  
5. **The Network (Community):** Live "Active Nodes" visualization.  
6. **Launch Pad (Events):** The Next Meetup RSVP.  
7. **Footer:** Legal \+ Socials.

## **5\. Technical Requirements**

* **Framework:** Next.js 14 (App Router).  
* **Styling:** Tailwind CSS.  
* **Icons:** Lucide React (standard for modern tech sites).  
* **Deployment:** Vercel Edge Network.  
* **Analytics:** Plausible (Privacy-friendly).

## **6\. Legal & Compliance**

* **Cookie Banner:** Fixed bottom, dismissible.  
* **Terms & Privacy:** Modal popups to reduce bounce rate.  
* **Disclaimer:** "Hardware Liability" clause in footer.