/**
 * Password validation utility
 * Validates password strength according to common security standards
 */

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * - Cannot be common patterns like "000000", "123456", "password", etc.
 */
export function validatePasswordStrength(password: string): PasswordValidationResult {
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let score = 0;

  // Check length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    score += 1;
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }

  // Check for number
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    score += 1;
  }

  // Check for special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*...)');
  } else {
    score += 1;
  }

  // Check for common weak patterns
  const commonPatterns = [
    /^0+$/, // All zeros
    /^1+$/, // All ones
    /^123456/, // Sequential numbers
    /^password$/i, // Word "password"
    /^qwerty$/i, // Keyboard pattern
    /^admin$/i, // Word "admin"
    /^letmein$/i, // Common password
  ];

  const isCommonPattern = commonPatterns.some(pattern => pattern.test(password));
  if (isCommonPattern) {
    errors.push('Password is too common or predictable');
  } else {
    score += 1;
  }

  // Check for repeated characters (like "000000", "aaaaaa")
  if (/(.)\1{4,}/.test(password)) {
    errors.push('Password cannot contain the same character repeated 5 or more times');
  } else {
    score += 1;
  }

  // Determine strength
  if (score >= 6 && errors.length === 0) {
    strength = 'strong';
  } else if (score >= 4) {
    strength = 'medium';
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Get password strength indicator text
 */
export function getPasswordStrengthText(strength: 'weak' | 'medium' | 'strong'): string {
  switch (strength) {
    case 'strong':
      return 'Strong password';
    case 'medium':
      return 'Medium strength';
    case 'weak':
      return 'Weak password';
    default:
      return '';
  }
}


