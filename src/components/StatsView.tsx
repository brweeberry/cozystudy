import { motion } from 'motion/react';
import { Clock, CheckCircle2, Flame, Award, Zap, Award as AwardIcon, Star, Sparkles, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface StatsViewProps {
    xp: number;
    level: number;
    streak: number;
    totalTime: number;
    tasks: number;
    onClaimReward: (xp: number) => void;
}

export default function StatsView({ xp, level, streak, totalTime, tasks, onClaimReward }: StatsViewProps) {
    const [claimed, setClaimed] = useState<string[]>([]);
    
    const milestones = [
        { id: 'daily-1', title: 'Early Bird', focus: '1 Session', reward: 100, icon: <Zap size={14} /> },
        { id: 'daily-2', title: 'Deep Diver', focus: '3 Sessions', reward: 350, icon: <Star size={14} /> },
        { id: 'daily-3', title: 'Flow Master', focus: '5 Sessions', reward: 800, icon: <AwardIcon size={14} /> },
    ];

    const progress = (xp % 1000) / 10;

    const handleClaim = (id: string, reward: number) => {
        if (claimed.includes(id)) return;
        setClaimed([...claimed, id]);
        onClaimReward(reward);
    };

    return (
        <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto py-8 overflow-y-auto custom-scrollbar h-full px-4 mb-20 md:mb-0">
            <header className="flex justify-between items-end shrink-0">
                <div>
                    <h2 className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold mb-2">Performance</h2>
                    <h1 className="text-4xl font-bold tracking-tighter">Your Journey</h1>
                </div>
                <div className="flex items-center gap-4 bg-[var(--color-bg-secondary)] px-4 md:px-6 py-2 md:py-3 rounded-2xl border border-[var(--color-border-dim)]">
                    <div className="text-right">
                        <p className="text-[10px] uppercase font-bold opacity-40">Current Level</p>
                        <p className="text-sm md:text-lg font-black text-[var(--color-accent)] italic">Level {level}</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                        <Sparkles size={20} />
                    </div>
                </div>
            </header>

            {/* Level Progress */}
            <section className="panel p-6 md:p-8 bg-[var(--color-bg-tertiary)]/50 relative overflow-hidden border-[var(--color-accent)]/10">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-lg md:text-xl font-bold tracking-tight mb-1">{xp % 1000} / 1000 XP</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Progress to Level {level + 1}</p>
                    </div>
                    <Star className="text-[var(--color-accent)] animate-spin-slow opacity-20 hidden md:block" size={48} />
                </div>
                <div className="w-full h-3 bg-[var(--color-bg-primary)] rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[#f3e7d3] shadow-[0_0_20px_rgba(230,213,188,0.4)]"
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Focus Streak', value: `${streak} Days`, sub: 'Daily Momentum', icon: <Flame size={18} /> },
                    { label: 'Time Invested', value: `${Math.floor(totalTime / 60)}h ${totalTime % 60}m`, sub: 'Life-time Focus', icon: <Clock size={18} /> },
                    { label: 'Awarded', value: tasks, sub: 'Targets Completed', icon: <Target size={18} /> },
                ].map((stat) => (
                    <div key={stat.label} className="panel p-6 flex flex-col gap-4 border-white/5 hover:border-[var(--color-accent)]/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-primary)] flex items-center justify-center text-[var(--color-accent)] border border-[var(--color-border-dim)] shadow-inner">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold opacity-40 mb-1">{stat.label}</p>
                            <p className="text-xl md:text-2xl font-bold tracking-tight">{stat.value}</p>
                            <p className="text-[10px] opacity-40 mt-1">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Claimable Milestones */}
            <section className="flex flex-col gap-6 pb-20">
                <div className="flex items-center gap-3">
                    <AwardIcon size={16} className="text-[var(--color-accent)] opacity-60" />
                    <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Daily Achievements</h2>
                </div>
                <div className="flex flex-col gap-3">
                    {milestones.map((m) => (
                        <div key={m.id} className={`panel p-4 flex items-center justify-between transition-all ${claimed.includes(m.id) ? 'opacity-40 grayscale-[0.5]' : 'hover:bg-white/[0.02]'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${claimed.includes(m.id) ? 'bg-green-500/10 text-green-500' : 'bg-[var(--color-bg-primary)] text-[var(--color-accent)]'}`}>
                                    {claimed.includes(m.id) ? <CheckCircle2 size={18} /> : m.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{m.title}</p>
                                    <p className="text-[10px] opacity-40">Goal: {m.focus}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black italic text-[var(--color-accent)]">+{m.reward} XP</span>
                                <button 
                                    onClick={() => handleClaim(m.id, m.reward)}
                                    disabled={claimed.includes(m.id)}
                                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${claimed.includes(m.id) ? 'bg-white/5 border border-white/10 opacity-50 cursor-default' : 'bg-[var(--color-accent)] text-[var(--color-bg-primary)] hover:scale-105 shadow-lg active:scale-95'}`}
                                >
                                    {claimed.includes(m.id) ? 'Claimed' : 'Claim'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
