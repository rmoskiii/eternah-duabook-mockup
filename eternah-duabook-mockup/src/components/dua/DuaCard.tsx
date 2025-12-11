import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, IconButton, Stack, Divider, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion'; // Animation wrapper
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import type { Dua } from '../../types';

interface DuaCardProps {
    dua: Dua;
    onPlay?: (id: string) => void;
    onPause?: (id: string) => void;
    onFavorite?: (id: string) => void;
    onShare?: (id: string) => void;
    isActive?: boolean;
}

export const DuaCard: React.FC<DuaCardProps> = ({ dua, onPlay, onPause, onFavorite, onShare, isActive = false }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState<number>(0); // 0-100 for simulated progress
    const simIntervalRef = useRef<number | null>(null);
    const simElapsedRef = useRef<number>(0);
    const SIM_DURATION = 8000; // ms for full simulated playback
    const simulate = !dua.audioUrl; // simulate when no real audio URL

    // If the dua has no audio, audioRef.current will be null and play is disabled
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
    }, [dua.audioUrl, onPause]);

    // Simulation helpers
    const startSimulation = () => {
        if (simIntervalRef.current) return;
        // resume from simElapsedRef (ms)
        const tick = 100; // ms
        simIntervalRef.current = window.setInterval(() => {
            simElapsedRef.current += tick;
            const pct = Math.min(100, (simElapsedRef.current / SIM_DURATION) * 100);
            setProgress(pct);
            if (pct >= 100) {
                // finished
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

    // cleanup simulation on unmount
    useEffect(() => {
        return () => {
            if (simIntervalRef.current) {
                clearInterval(simIntervalRef.current);
                simIntervalRef.current = null;
            }
        };
    }, []);

    // When parent tells us we are no longer the active player, pause local audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) {
            if (!isActive && simulate && isPlaying) {
                // pause simulation if parent deactivated
                pauseSimulation();
            }
            return;
        }
        if (!isActive && !audio.paused) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (simulate) {
            // Toggle simulated playback
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
            // audio 'pause' event handler will call onPause
        } else {
            audio.play().catch(() => {
                // playback might fail (autoplay restrictions); just set state conservatively
                setIsPlaying(false);
            });
            setIsPlaying(true);
            onPlay?.(dua.id);
        }
    };

    const handleFavorite = () => {
        onFavorite?.(dua.id);
    };

    const handleShare = () => {
        onShare?.(dua.id);
    };

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
                p: 0, // Padding handled inside to allow full-width footer
                borderRadius: 3,
                boxShadow: 1,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                mb: 3 // Spacing between cards when listing
            }}>

                {/* Card Content */}
                <Box sx={{ p: { xs: 2, sm: 4 } }}>
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

                    {/* Arabic - wrapped to avoid overflow */}
                    <Typography variant="h5" sx={{ my: 2, fontSize: { xs: '1.1rem', sm: '1.5rem' } }} className="wrap-break">
                        {dua.arabic}
                    </Typography>

                    {/* Transliteration (Italicized for distinction) */}
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
                    <Typography variant="body1" sx={{ fontWeight: 500 }} className="wrap-break">
                        {dua.translation}
                    </Typography>

                    {/* Reference */}
                    {dua.reference && (
                        <Typography variant="caption" display="block" sx={{ mt: 2, opacity: 0.6 }}>
                            {dua.reference}
                        </Typography>
                    )}
                </Box>

                {/* Hidden audio element (controlled by play button) */}
                {dua.audioUrl && (
                    <audio ref={audioRef} src={dua.audioUrl} preload="none" />
                )}

                {/* Action Bar */}
                <Divider sx={{ opacity: 0.6 }} />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ px: 2, py: 1.5, bgcolor: 'background.default' }}
                >
                    {/* Play/Pause Button - disabled if no audio */}
                    <IconButton
                        aria-label={simulate ? (isPlaying ? 'Pause simulated audio' : 'Play simulated audio') : (isPlaying ? 'Pause audio' : 'Play audio')}
                        onClick={togglePlay}
                        // if simulating, enable button; otherwise only enable when audio exists
                        disabled={false}
                        sx={{ color: 'secondary.main', border: '1px solid', borderColor: 'secondary.main' }}
                    >
                        {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
                    </IconButton>

                    {/* Secondary Actions */}
                    <Stack direction="row" spacing={1}>
                        <IconButton aria-label="favorite dua" onClick={handleFavorite}>
                            <FavoriteBorderRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="share dua" onClick={handleShare}>
                            <IosShareRoundedIcon />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Progress bar (shows during simulated playback or real playback when active) */}
                {(isPlaying || progress > 0) && (
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 4 }} />
                )}

            </Box>
        </motion.div>
    );
};