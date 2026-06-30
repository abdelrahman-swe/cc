/**
 * Code Clouders Design Tokens
 * Source of Truth from Figma Design File: Codeclouders.web (node-id=413:23839)
 */

export const colors = {
  // Primary Palette
  primary: {
    500: '#F15722', // Brand Orange (Main Accent)
    400: '#F4794E',
    300: '#F79A7A',
    75:  '#FCDDD3',
    50:  '#FEEEE9',
    25:  '#FFFFFF',
  },

  // Secondary Palette (Navy)
  secondary: {
    900: '#070C18',
    800: '#0E1730', // Deep Navy / Dark Headers
    500: '#243A77', // Main Brand Navy
  },

  // Neutral Palette
  neutral: {
    800: '#1E1E20', // Headings / Step Titles / Main Titles
    700: '#2F3032', // Tags / Secondary Titles
    600: '#414244', // Non-active Nav Links
    500: '#5F6063', // Body Text / Card Descriptions
    400: '#98999A', // Secondary Body Text / Card Subtext (#575C5E)
    300: '#D5D6D7', // Subtitles (#808586)
    200: '#EAEAEB',
    100: '#F9F9F9',
    50:  '#FFFFFF',
    25:  '#E8EAEA',
  },

  // Special Brand Accents
  brand: {
    900: '#021966',
    25:  '#F4F8FE',
    base: '#FFFFFF',
  }
} as const;

export const typography = {
  fonts: {
    serifDisplay: '"Thmanyah Serif Display", Georgia, serif',
    serifText: '"Thmanyah Serif Text", Georgia, serif',
    sansArabic: '"IBM Plex Sans Arabic", sans-serif',
    sansBrand: '"IBM Plex Sans Arabic", sans-serif',
  },

  styles: {
    // Nav Links
    navActive: {
      color: 'var(--Primary-500, #F15722)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: 'normal',
    },
    navInactive: {
      color: 'var(--Neutral-600, #414244)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: 'normal',
    },

    // Hero Section
    heroHeadline: {
      fontFamily: '"Thmanyah Serif Display", serif',
      fontSize: '52px',
      fontWeight: 700,
      lineHeight: '118%',
    },
    heroSubtitle: {
      color: 'var(--Neutral-300, #808586)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '140%', // 33.6px
      textAlign: 'center' as const,
    },
    heroCardTitle: {
      color: 'var(--Neutral-800, #121516)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      lineHeight: 'normal',
      textAlign: 'right' as const,
    },
    heroCardDescription: {
      color: 'var(--Neutral-400, #575C5E)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '140%', // 28px
      textAlign: 'right' as const,
    },

    // Section Tags
    sectionTag: {
      color: 'var(--Neutral-700, #2F3032)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 'normal',
    },

    // Methodology / Steps
    stepTitle: {
      color: 'var(--Neutral-800, #1E1E20)',
      fontFamily: '"Thmanyah Serif Text", serif',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 'normal',
      textAlign: 'center' as const,
    },
    stepBody: {
      color: 'var(--Neutral-500, #5F6063)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '150%', // 27px
      textAlign: 'center' as const,
    },

    // Services
    serviceTitle: {
      color: 'var(--Neutral-800, #1E1E20)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: 'normal',
      textAlign: 'right' as const,
    },
    serviceBody: {
      color: 'var(--Neutral-500, #5F6063)',
      fontFamily: '"IBM Plex Sans Arabic", sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '140%', // 25.2px
      textAlign: 'right' as const,
    },
  }
} as const;

export const spacing = {
  maxSectionGap: '128px',
  containerMaxWidth: '1240px',
  headerHeight: '100px',
} as const;

export default {
  colors,
  typography,
  spacing,
};
