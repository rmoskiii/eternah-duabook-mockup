import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton, Stack, Divider, LinearProgress, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
// Actions
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
// Visual Icons
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import MosqueRoundedIcon from '@mui/icons-material/MosqueRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded'; // Heart in hand
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

import type { Dua } from '../../types'; // Adjust path to your types/index.ts

interface DuaCardProps {
    dua: Dua;
    onPlay?: (id: string) => void;
    onPause?: (id: string) => void;
    onFavorite?: (id: string) => void;
    onShare?: (id: string) => void;
    isActive?: boolean;
}

// Helper to render the specific icon based on the mock data
const getIllustration = (type?: string) => {
    const iconStyle = { fontSize: 40, color: '#C5A059' }; // Eternah Gold
    switch (type) {
        case 'heart': return <VolunteerActivismRoundedIcon sx={iconStyle} />;
        case 'sun': return <WbSunnyRoundedIcon sx={iconStyle} />;
        case 'moon': return <DarkModeRoundedIcon sx={iconStyle} />;
        case 'cloud': return <CloudQueueRoundedIcon sx={iconStyle} />;
        case 'book': return <MenuBookRoundedIcon sx={iconStyle} />;
        default: return <MosqueRoundedIcon sx={iconStyle} />;
    }
};

export const DuaCard: React.FC<DuaCardProps> = ({ dua, onPlay, onPause, onFavorite, onShare, isActive = false }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState<number>(0);
    const simIntervalRef = useRef<number | null>(null);
    const simElapsedRef = useRef<number>(0);
    const SIM_DURATION = 8000;
    const simulate = !dua.audioUrl;

    // --- Audio Logic ---
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            setIsPlaying(false);
            onPause?.(dua.id);
        };
        const handlePause = () => {
            setIsPlaying(false);
            onPause?.(dua.id);
        };
        const handlePlay = () => setIsPlaying(true);

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('play', handlePlay);
        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('play', handlePlay);
        };
    }, [dua.audioUrl, onPause, dua.id]);

    const startSimulation = () => {
        if (simIntervalRef.current) return;
        const tick = 100;
        simIntervalRef.current = window.setInterval(() => {
            simElapsedRef.current += tick;
            const pct = Math.min(100, (simElapsedRef.current / SIM_DURATION) * 100);
            setProgress(pct);
            if (pct >= 100) {
                if (simIntervalRef.current) {
                    clearInterval(simIntervalRef.current);
                    simIntervalRef.current = null;
                }
                simElapsedRef.current = 0;
                setIsPlaying(false);
                setTimeout(() => setProgress(0), 300);
                onPause?.(dua.id);
            }
        }, tick) as unknown as number;
        setIsPlaying(true);
        onPlay?.(dua.id);
    };

    const pauseSimulation = () => {
        if (simIntervalRef.current) {
            clearInterval(simIntervalRef.current);
            simIntervalRef.current = null;
        }
        setIsPlaying(false);
        onPause?.(dua.id);
    };

    useEffect(() => {
        return () => {
            if (simIntervalRef.current) {
                clearInterval(simIntervalRef.current);
                simIntervalRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) {
            if (!isActive && simulate && isPlaying) {
                pauseSimulation();
            }
            return;
        }
        if (!isActive && !audio.paused) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [isActive, simulate, isPlaying]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (simulate) {
            if (isPlaying) {
                pauseSimulation();
            } else {
                startSimulation();
            }
            return;
        }

        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => {
                setIsPlaying(false);
            });
            setIsPlaying(true);
            onPlay?.(dua.id);
        }
    };

    const handleFavorite = () => onFavorite?.(dua.id);
    const handleShare = () => onShare?.(dua.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
        >
            <Box sx={{
                bgcolor: 'background.paper',
                p: 0,
                borderRadius: 3,
                boxShadow: 1,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                mb: 3
            }}>

                {/* --- VISUAL HEADER (The Organic "Instagram" Feel) --- */}
                <Box sx={{
                    pt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: '#F9FAFB', // Very light grey circle
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid',
                        borderColor: '#F3F4F6'
                    }}>
                        {/* If url exists, show Avatar. Else show vector icon. */}
                        {dua.illustration ? (
                            <Avatar
                                src={dua.illustration}
                                sx={{ width: 80, height: 80 }}
                            />
                        ) : (
                            getIllustration(dua.iconType)
                        )}
                    </Box>
                </Box>

                {/* Card Content */}
                <Box sx={{ p: { xs: 2, sm: 4 }, pt: 2 }}>
                    <Typography
                        variant="overline"
                        color="secondary"
                        sx={{
                            letterSpacing: 3,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase'
                        }}
                    >
                        {dua.category}
                    </Typography>

                    {/* Arabic */}
                    <Typography
                        variant="h5"
                        sx={{ my: 2, fontSize: { xs: '1.5rem', sm: '1.8rem' }, lineHeight: 2 }}
                        className="wrap-break"
                    >
                        {dua.arabic}
                    </Typography>

                    {/* Transliteration */}
                    {dua.transliteration && (
                        <Typography
                            variant="body2"
                            sx={{
                                fontStyle: 'italic',
                                color: 'text.secondary',
                                mb: 1,
                                opacity: 0.9
                            }}
                        >
                            {dua.transliteration}
                        </Typography>
                    )}

                    {/* Translation */}
                    <Typography variant="body1" sx={{ fontWeight: 500, mt: 2 }} className="wrap-break">
                        {dua.translation}
                    </Typography>

                    {/* Reference */}
                    {dua.reference && (
                        <Typography variant="caption" display="block" sx={{ mt: 2, opacity: 0.6 }}>
                            {dua.reference}
                        </Typography>
                    )}
                </Box>

                {/* Hidden Audio Element */}
                {dua.audioUrl && (
                    <audio ref={audioRef} src={dua.audioUrl} preload="none" />
                )}

                {/* Action Bar */}
                <Divider sx={{ opacity: 0.6 }} />

                {/* Progress Bar (Sitting on top of the divider) */}
                {(isPlaying || progress > 0) && (
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        color="secondary"
                        sx={{ height: 3, bgcolor: 'transparent' }}
                    />
                )}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ px: 2, py: 1.5, bgcolor: 'background.default' }}
                >
                    <IconButton
                        onClick={togglePlay}
                        sx={{
                            color: 'secondary.main',
                            border: '1px solid',
                            borderColor: 'secondary.main',
                            width: 40,
                            height: 40
                        }}
                    >
                        {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
                    </IconButton>

                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={handleFavorite}>
                            <FavoriteBorderRoundedIcon />
                        </IconButton>
                        <IconButton onClick={handleShare}>
                            <IosShareRoundedIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </motion.div>
    );
};