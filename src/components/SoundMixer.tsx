import React, { useState, useEffect } from 'react';
import { Volume2, CloudRain, Flame, Music, Coffee, Bird } from 'lucide-react';
import { Howl } from 'howler';
import { motion } from 'motion/react';

interface Sound {
    id: string;
    name: string;
    icon: React.ReactNode;
    url: string;
}

const SOUNDS: Sound[] = [
    { 
        id: 'lofi', 
        name: 'Soft Lofi', 
        icon: <Music size={16} />, 
        url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808f3030c.mp3?filename=lofi-study-112191.mp3',
    },
    { 
        id: 'rain', 
        name: 'Gentle Rain', 
        icon: <CloudRain size={16} />, 
        url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_884ef937a0.mp3?filename=soft-rain-ambient-1629.mp3',
    },
    { 
        id: 'fire', 
        name: 'Log Fire', 
        icon: <Flame size={16} />, 
        url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_510de83872.mp3?filename=crackling-fireplace-nature-sounds-8012.mp3',
    },
    { 
        id: 'cafe', 
        name: 'Lively Cafe', 
        icon: <Coffee size={16} />, 
        url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_82c2a3e0f4.mp3?filename=coffee-shop-ambience-7711.mp3',
    },
    { 
        id: 'forest', 
        name: 'Summer Forest', 
        icon: <Bird size={16} />, 
        url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13efacc.mp3?filename=forest-lullaby-110624.mp3',
    },
];

function SoundControl({ sound }: { sound: Sound; key?: string }) {
    const [volume, setVolume] = useState(0);
    const [howl, setHowl] = useState<Howl | null>(null);

    useEffect(() => {
        const soundInstance = new Howl({
            src: [sound.url],
            html5: true,
            loop: true,
            volume: 0,
            onload: () => console.log(`Loaded ${sound.name}`),
            onloaderror: (id, err) => console.error('Audio load error:', err),
        });
        setHowl(soundInstance);

        return () => {
            soundInstance.stop();
            soundInstance.unload();
        };
    }, [sound.url]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (howl) {
            howl.volume(val);
            if (val > 0 && !howl.playing()) {
                howl.play();
            } else if (val === 0 && howl.playing()) {
                howl.pause();
            }
        }
    };

    return (
        <div className="flex flex-col gap-3 group transition-all duration-500 p-4 rounded-2xl bg-[var(--color-bg-secondary)]/30 border border-transparent hover:border-[var(--color-accent)]/20 hover:bg-[var(--color-bg-secondary)]/50" style={{ opacity: volume > 0 ? 1 : 0.6 }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-[var(--color-border-dim)] flex items-center justify-center bg-[var(--color-bg-tertiary)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-primary)] transition-all duration-300">
                        {sound.icon}
                    </div>
                    <span className="text-xs font-bold tracking-tight uppercase opacity-80">{sound.name}</span>
                </div>
                {volume > 0 && (
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] animate-pulse"
                    />
                )}
            </div>
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-[var(--color-bg-primary)] rounded-full appearance-none cursor-pointer accent-[var(--color-accent)] transition-all"
            />
        </div>
    );
}

export default function SoundMixer() {
  return (
    <div className="flex flex-col gap-6 w-full" id="sound-mixer">
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex justify-between items-center">
            <h3 className="text-[11px] uppercase tracking-[0.3em] opacity-40 font-black">Atmosphere</h3>
            <Volume2 size={14} className="opacity-20" />
        </div>
        <div className="h-px w-8 bg-[var(--color-accent)] opacity-40" />
      </div>
      <div className="flex flex-col gap-4">
        {SOUNDS.map(sound => (
            <SoundControl key={sound.id} sound={sound} />
        ))}
      </div>
    </div>
  );
}
