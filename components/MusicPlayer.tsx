'use client';

import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}

const MusicPlayer = ({ isPlaying, setIsPlaying }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/bg-audio.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl ${
            isPlaying
              ? 'bg-gradient-to-r from-rose-500 to-pink-500'
              : 'bg-gradient-to-r from-amber-500 to-orange-500'
          } text-white`}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
