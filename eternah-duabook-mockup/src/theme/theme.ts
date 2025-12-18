import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const baseColors = {
  primary: '#1F2937',    // Deep Charcoal/Navy
  secondary: '#C5A059',  // Muted Gold
  backgroundLight: '#F0EEEA', // Eternah light background
  paperLight: '#FFFFFF',
  textMain: '#111827',
  textMuted: '#6B7280',
};

export function createAppTheme(mode: 'light' | 'dark') {
  const palette = {
    mode,
    primary: { main: baseColors.primary },
    secondary: { main: baseColors.secondary },
    background: {
      default: mode === 'light' ? baseColors.backgroundLight : '#0b1220',
      paper: mode === 'light' ? baseColors.paperLight : '#08101a',
    },
    text: {
      primary: mode === 'light' ? baseColors.textMain : '#E6EEF6',
      secondary: mode === 'light' ? baseColors.textMuted : '#9CA3AF',
    },
  } as any;

  let theme = createTheme({
    palette,
    typography: {
      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
      h1: {
        fontFamily: 'Playfair Display, serif',
        fontWeight: 700,
        // Use the palette text color so headings remain readable in dark mode
        color: palette.text.primary,
      },
      h2: {
        fontFamily: 'Playfair Display, serif',
        fontWeight: 600,
        color: palette.text.primary,
        fontSize: '2.5rem',
      },
      h3: {
        fontFamily: 'Playfair Display, serif',
        fontWeight: 600,
      },
      body1: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        color: palette.text.primary,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            padding: '10px 24px',
            '&:hover': { boxShadow: 'none' },
          },
          containedPrimary: {
            backgroundColor: baseColors.primary,
            color: '#fff',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
          rounded: { borderRadius: 16 },
          elevation1: { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
          },
        },
      },
    },
  });

  // Arabic typography variant
  theme = createTheme(theme, {
    typography: {
      h4: {
        fontFamily: 'Amiri, serif',
        fontSize: '2rem',
        lineHeight: 2.4,
        direction: 'rtl',
        // ensure h4 (used for some headings) follows the palette text color
        color: theme.palette.text.primary,
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
}

export default createAppTheme('light');
