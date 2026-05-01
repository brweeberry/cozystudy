import { motion } from 'motion/react';
import { User, Award, Shield, Star, Hexagon, Camera, Edit2 } from 'lucide-react';

const BADGES = [
    { name: 'Early Bird', icon: <Star size={16} />, color: 'bg-yellow-500/20 text-yellow-500' },
    { name: 'Focused Pro', icon: <Hexagon size={16} />, color: 'bg-blue-500/20 text-blue-500' },
    { name: 'Lofi Listener', icon: <Award size={16} />, color: 'bg-purple-500/20 text-purple-500' },
    { name: 'Social Binder', icon: <Shield size={16} />, color: 'bg-white/10 text-white' },
];

const ACHIEVEMENTS = [
    { title: '100% Flow State', date: 'Oct 12, 2023', progress: 100 },
    { title: 'Consistency King', date: 'Sep 30, 2023', progress: 75 },
    { title: 'Night Owl Hero', date: 'Aug 15, 2023', progress: 40 },
];

interface ProfileViewProps {
    level: number;
    xp: number;
    streak: number;
}

export default function ProfileView({ level, xp, streak }: ProfileViewProps) {
    const xpProgress = (xp % 1000) / 10;
    return (
        <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto py-8 overflow-y-auto custom-scrollbar h-full px-4 mb-20 md:mb-0">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start border-b border-[var(--color-border-dim)] pb-12">
                <div className="relative group">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-[var(--color-bg-tertiary)] border-2 border-[var(--color-accent)] flex items-center justify-center overflow-hidden shadow-2xl relative">
                        <User size={80} className="opacity-20" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                            <Camera size={24} />
                        </div>
                    </div>
                    <button className="absolute -bottom-1 -right-1 p-2 bg-[var(--color-accent)] text-[var(--color-bg-primary)] rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                        <Edit2 size={14} />
                    </button>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Cozy Explorer</h1>
                        <span className="px-4 py-1 bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-[10px] font-bold uppercase tracking-widest rounded-full w-fit mx-auto md:mx-0">Lvl {level}</span>
                    </div>
                    <p className="text-sm opacity-40 mb-6 max-w-md">Mastering the flow of deep work through lofi rhythms. Currently on a {streak}-day momentum streak.</p>
                    
                    <div className="w-full max-w-sm h-2 bg-[var(--color-bg-primary)] rounded-full overflow-hidden mb-8 mx-auto md:mx-0">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${xpProgress}%` }}
                            className="h-full bg-[var(--color-accent)] shadow-[0_0_10px_rgba(230,213,188,0.5)]"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {BADGES.map(badge => (
                            <div key={badge.name} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 ${badge.color}`}>
                                {badge.icon}
                                <span className="text-[9px] font-bold uppercase tracking-widest">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-6">Focus Roadmap</h2>
                    <div className="flex flex-col gap-6">
                        {ACHIEVEMENTS.map(ach => (
                            <div key={ach.title} className="panel p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="text-sm font-bold tracking-tight">{ach.title}</h4>
                                    <span className="text-[9px] opacity-30 font-mono">{ach.date}</span>
                                </div>
                                <div className="w-full h-1 bg-[var(--color-bg-primary)] rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${ach.progress}%` }}
                                        className="h-full bg-[var(--color-accent)] shadow-[0_0_8px_rgba(230,213,188,0.4)]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div>
                        <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-6">Profile Emblems</h2>
                        <div className="panel p-8 grid grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className={`aspect-square rounded-2xl bg-[var(--color-bg-primary)] border border-dashed border-[var(--color-border-dim)] flex items-center justify-center opacity-20 hover:opacity-100 hover:border-[var(--color-accent)] transition-all cursor-pointer`}>
                                    {i === 1 ? <Star size={24} className="text-yellow-500/40" /> : <Shield size={24} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
