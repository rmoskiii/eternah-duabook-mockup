import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography, IconButton } from '@mui/material';
import { createAppTheme } from './theme/theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { EmotionSelector } from './components/ui/EmotionSelector'; // <--- IMPORT COMPONENT
import { mockDuas } from './data/mockData';
import type { Dua } from './types';
import { DuaCard } from './components/dua/DuaCard';


function App() {
    // Theme mode (light | dark)
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    // State to track active emotion
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    // Track which dua is currently playing so we can pause others
    const [playingId, setPlayingId] = useState<string | null>(null);

    const handleEmotionSelect = (id: string) => {
        // If clicking the same one, toggle it off. Otherwise, select new one.
        setSelectedEmotion(prev => prev === id ? null : id);
    };

    const handlePlay = (id: string) => {
        setPlayingId(id);
    };

    const handlePause = (id: string) => {
        // Only clear if the paused id is the currently playing one
        setPlayingId(prev => (prev === id ? null : prev));
    };

    const handleFavorite = (id: string) => {
        // stub: wire to persisted favorites later
        console.log('favorite clicked', id);
    };

    const handleShare = async (id: string) => {
        const dua = mockDuas.find(d => d.id === id);
        if (!dua) return;
        const payload = {
            title: `Du\'a – ${dua.category}`,
            text: `${dua.arabic}\n\n${dua.translation}`,
            url: window.location.href,
        };
        if (navigator.share) {
            try {
                await navigator.share(payload);
            } catch (err) {
                console.log('share failed', err);
            }
        } else {
            // fallback: copy text to clipboard
            try {
                await navigator.clipboard.writeText(`${dua.arabic}\n\n${dua.translation}`);
                console.log('Dua copied to clipboard');
            } catch (e) {
                console.log('clipboard failed', e);
            }
        }
    };

    const toggleMode = () => setMode(prev => prev === 'light' ? 'dark' : 'light');

    // Lightweight mapping from emotion IDs to tags we use in mockDuas.
    const emotionToTags: Record<string, string[]> = {
        anxiety: ['distress', 'confidence', 'exam', 'meeting'],
        sadness: ['distress', 'grief', 'forgiveness'],
        grateful: ['success', 'comprehensive'],
        lost: ['distress'],
        happy: ['success'],
        morning: ['comprehensive', 'protection'],
        evening: ['protection'],
    };

    // Find duas that match the selected emotion by tag or category (case-insensitive)
    const getMatchingDuas = (): Dua[] => {
        if (!selectedEmotion) return mockDuas;
        const tags = emotionToTags[selectedEmotion] || [selectedEmotion];

        return mockDuas.filter(d => {
            // match by tag
            const byTag = d.tags.some(t => tags.includes(t));
            // match by category name
            const byCategory = d.category.toLowerCase() === selectedEmotion.toLowerCase();
            return byTag || byCategory;
        });
    };

    const matchingDuas = getMatchingDuas();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Restored in-container header (original look) */}

             <Container
                maxWidth={false}
                sx={{
                    width: { xs: 'calc(100% - 2rem)', sm: '100%' }, // account for body padding on mobile
                    boxSizing: 'border-box',
                    maxWidth: { xs: 430, md: 760 }, // mobile narrow, wider on desktop for centered layout
                     minWidth: 0,
                     minHeight: '100vh',
                     py: { xs: 3, sm: 4 },
                     px: { xs: 1.5, sm: 2 },
                     mx: 'auto',
                     display: 'flex',
                     flexDirection: 'column',
                 }}
             >

                {/* Header (restored inside the container) with theme toggle */}
                <Box sx={{ mb: 3, mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' },
                                lineHeight: 1.05,
                            }}
                        >
                            Eternah
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            Daily Adhkar & Du'a
                        </Typography>
                    </Box>

                    <Box sx={{ mt: { xs: 1.5, sm: 0 } }}>
                        <IconButton aria-label="toggle theme" onClick={toggleMode} color="inherit">
                            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Box>
                </Box>


                {/* --- NEW: EMOTION SELECTOR --- */}
                <Box sx={{ mb: 4 }}>
                    <EmotionSelector
                        selected={selectedEmotion}
                        onSelect={handleEmotionSelect}
                    />
                </Box>

                {/* Dua results (render matching dua cards). If nothing matches, show a helpful message. */}
                <Box sx={{ width: '100%' }}>
                    {matchingDuas.length > 0 ? (
                        matchingDuas.map((d) => (
                            <DuaCard
                                key={d.id}
                                dua={d}
                                isActive={playingId === d.id}
                                onPlay={handlePlay}
                                onPause={handlePause}
                                onFavorite={handleFavorite}
                                onShare={handleShare}
                            />
                        ))
                    ) : (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body1">No du'a found for this emotion.</Typography>
                        </Box>
                    )}
                </Box>

                <Box sx={{ mt: 'auto', textAlign: 'center', opacity: 0.5, pt: 4 }}>
                    <Typography variant="caption">
                        v1.0 Mockup
                    </Typography>
                </Box>

            </Container>
        </ThemeProvider>
    );
}

export default App;