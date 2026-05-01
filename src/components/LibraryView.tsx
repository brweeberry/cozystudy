import React from 'react';
import { motion } from 'motion/react';
import { Music, Coffee, CloudRain, Flame, Wind, Trees as Tree, Sparkles } from 'lucide-react';

const PRESETS = [
    { name: 'Rainy Cafe', icon: <Coffee />, mood: 'Productive', sounds: ['Rain', 'Cafe'], color: 'border-blue-500/20' },
    { name: 'Fireplace Cabin', icon: <Flame />, mood: 'Cozy', sounds: ['Fire', 'Vinyl'], color: 'border-orange-500/20' },
    { name: 'Deep Forest', icon: <Tree />, mood: 'Meditative', sounds: ['Birds', 'Wind'], color: 'border-green-500/20' },
    { name: 'Starry Night', icon: <Sparkles />, mood: 'Calm', sounds: ['Lofi', 'Soft Rain'], color: 'border-purple-500/20' },
];

const TRACKS = [
    { title: 'Distant Memories', artist: 'Lofi Girl', duration: '3:45' },
    { title: 'Midnight Rain', artist: 'Chillhop', duration: '2:30' },
    { title: 'Cozy Fireplace', artist: 'Ambient Echoes', duration: '5:12' },
    { title: 'Morning Dew', artist: 'Nature Sounds', duration: '4:20' },
];

export default function LibraryView() {
    return (
        <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto py-8 overflow-y-auto custom-scrollbar h-full px-4">
            <section>
                <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-8">Atmosphere Presets</h2>
                <div className="grid grid-cols-2 gap-6">
                    {PRESETS.map((preset) => (
                        <motion.button
                            key={preset.name}
                            whileHover={{ y: -4 }}
                            className={`panel p-6 flex items-start gap-6 text-left group hover:border-[var(--color-accent)] ${preset.color}`}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-tertiary)] flex items-center justify-center text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                                {React.cloneElement(preset.icon as React.ReactElement, { size: 32 })}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold tracking-tight mb-1">{preset.name}</h3>
                                <p className="text-xs opacity-40 uppercase tracking-widest font-semibold mb-4">{preset.mood}</p>
                                <div className="flex gap-2">
                                    {preset.sounds.map(s => (
                                        <span key={s} className="text-[10px] bg-[var(--color-bg-primary)] px-2 py-0.5 rounded border border-[var(--color-border-dim)]">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-8">Curated Music Tracks</h2>
                <div className="panel p-2">
                    {TRACKS.map((track, i) => (
                        <div key={track.title} className={`flex items-center justify-between p-4 rounded-xl hover:bg-[var(--color-bg-tertiary)] transition-colors group cursor-pointer ${i !== TRACKS.length - 1 ? 'border-b border-[var(--color-border-dim)]' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-primary)] flex items-center justify-center border border-[var(--color-border-dim)] group-hover:border-[var(--color-accent)] transition-colors">
                                    <Music size={14} className="opacity-40 group-hover:opacity-100" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{track.title}</p>
                                    <p className="text-[10px] opacity-40 uppercase tracking-widest">{track.artist}</p>
                                </div>
                            </div>
                            <span className="text-xs font-mono opacity-20">{track.duration}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
