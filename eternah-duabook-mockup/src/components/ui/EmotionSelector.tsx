import { Chip, Stack, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

// The list of feelings (inspired by Life With Allah)
const emotions = [
    { id: 'anxiety', label: 'Anxious', icon: '😰' },
    { id: 'sadness', label: 'Sad', icon: '💔' },
    { id: 'grateful', label: 'Grateful', icon: '✨' },
    { id: 'lost', label: 'Lost', icon: '🌫️' },
    { id: 'happy', label: 'Happy', icon: '😊' },
    { id: 'morning', label: 'Morning', icon: '☀️' },
    { id: 'evening', label: 'Evening', icon: '🌙' },
];

interface EmotionSelectorProps {
    selected: string | null;
    onSelect: (id: string) => void;
}

export const EmotionSelector = ({ selected, onSelect }: EmotionSelectorProps) => {
    return (
        <Box sx={{ py: 2 }}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    mb: 1.5,
                    pl: 1 // Align with the scroll start
                }}
            >
                How is your heart today?
            </Typography>

            {/* Horizontal Scroll Container */}
            <Stack
                direction="row"
                spacing={1.5}
                sx={{
                    overflowX: 'auto', // Enables side scrolling
                    pb: 1, // Space for scrollbar (if visible)
                    px: 1, // Padding on ends so chips don't touch screen edge
                    minWidth: 0, // allow flex children to shrink
                    whiteSpace: 'nowrap', // keep chips on a single row for scroll
                    // Hide scrollbar for cleaner look
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                }}
            >
                {emotions.map((emotion, index) => (
                    <motion.div
                        key={emotion.id}
                        // 1. Entrance Animation (Staggered Fade In)
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        // 2. Tap Animation (Bounce)
                        whileTap={{ scale: 0.95 }}
                        style={{ display: 'inline-flex' }} // ensure each chip doesn't cause vertical wrapping
                    >
                        <Chip
                            label={`${emotion.icon}  ${emotion.label}`}
                            onClick={() => onSelect(emotion.id)}
                            sx={{
                                height: 44, // Taller touch target for mobile
                                fontSize: '0.95rem',
                                borderRadius: 50,
                                transition: 'all 0.2s ease',
                                // Active State Styling
                                bgcolor: selected === emotion.id ? 'primary.main' : 'white',
                                color: selected === emotion.id ? 'white' : 'text.primary',
                                border: '1px solid',
                                borderColor: selected === emotion.id ? 'primary.main' : '#E5E7EB',
                                '&:hover': {
                                    bgcolor: selected === emotion.id ? 'primary.dark' : '#F3F4F6',
                                },
                                // ensure chips don't shrink or wrap internally
                                flex: '0 0 auto',
                            }}
                        />
                    </motion.div>
                ))}
            </Stack>
        </Box>
    );
};