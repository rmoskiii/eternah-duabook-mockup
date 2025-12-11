import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// --- Color Palette (The "Eternah" Aesthetic) ---
// Derived from their Instagram: Deep Navy, Muted Gold, and Cream Paper.
const colors = {
  primary: '#1F2937',    // Deep Charcoal/Navy (Authoritative, readable)
  secondary: '#C5A059',  // Muted Gold (Elegant, not flashy)
  background: '#FDFBF7', // "Warm Paper" (Easier on eyes than #FFFFFF)
  paper: '#FFFFFF',      // Pure white for cards to pop against the cream background
  textMain: '#111827',   // Almost black
  textMuted: '#6B7280',  // Grey for translations
};

// --- Typography Setup ---
let theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    background: {
      default: colors.background,
      paper: colors.paper,
    },
    text: {
      primary: colors.textMain,
      secondary: colors.textMuted,
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    // English Headings (Playfair Display)
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: colors.primary,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: colors.primary,
      fontSize: '2.5rem', // Base size (will auto-scale down on mobile)
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    // Body text (Inter)
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.95rem', // Slightly smaller for better reading on narrow phone screens
      lineHeight: 1.7,      // Airy line height for readability
      color: colors.textMain,
    },
  },
  components: {
    // 1. Buttons: Soft pills, not sharp rectangles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50, // Pill shape
          textTransform: 'none', // Lowercase is more conversational/friendly
          fontWeight: 600,
          boxShadow: 'none',
          padding: '10px 24px',
          '&:hover': {
            boxShadow: 'none', // Keep it flat and modern
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary,
          color: '#fff',
        },
      },
    },
    // 2. Cards: Soft shadows, high-end feel
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default MUI dark mode gradients
        },
        rounded: {
          borderRadius: 16, // Modern curve
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Very subtle luxury shadow
        },
      },
    },
    // 3. Chips (for the Emotion Selector): Minimalist
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500,
        },
      },
    },
  },
});

// --- Custom Typography Variant for Arabic ---
// We extend the theme to add a specific variant for Arabic text.
// Arabic requires larger font sizes and taller line heights to avoid clipping diacritics.
theme = createTheme(theme, {
  typography: {
    h4: {
      fontFamily: '"Amiri", serif', // The Quranic font
      fontSize: '2rem',             // Optimized for mobile screens
      lineHeight: 2.4,              // Tall line height prevents vowels (Fatha/Kasra) from clipping
      direction: 'rtl',             // Right-to-left
      color: colors.primary,
    },
  },
});

// Automatically resize fonts for mobile vs desktop
theme = responsiveFontSizes(theme);

export default theme;