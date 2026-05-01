import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, UserPlus, MessageSquare, ShieldCheck, Zap, X, Check, Trash2, Crown } from 'lucide-react';

interface Group {
    id: string;
    name: string;
    members: number;
    active: number;
    topic: string;
    intensity: string;
    color: string;
    isOwner: boolean;
    isJoined?: boolean;
}

const INITIAL_GROUPS: Group[] = [
    { 
        id: '1',
        name: 'Late Night Coders', 
        members: 42, 
        active: 12, 
        topic: 'React & Vite',
        intensity: 'Deep Work',
        color: 'border-blue-500/20',
        isOwner: false
    },
    { 
        id: '2',
        name: 'Design Sprint', 
        members: 28, 
        active: 8, 
        topic: 'UI/UX Patterns',
        intensity: 'Flow State',
        color: 'border-orange-500/20',
        isOwner: false
    },
];

const ONLINE_MEMBERS = [
    { name: 'Sora', status: 'Focusing', avatar: 'https://i.pravatar.cc/150?u=sora' },
    { name: 'Hiro', status: 'Deep Work', avatar: 'https://i.pravatar.cc/150?u=hiro' },
    { name: 'Elena', status: 'Reading', avatar: 'https://i.pravatar.cc/150?u=elena' },
    { name: 'Max', status: 'Flow', avatar: 'https://i.pravatar.cc/150?u=max' },
];

export default function GroupsView() {
    const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
    const [isCreating, setIsCreating] = useState(false);
    const [joinedGroupId, setJoinedGroupId] = useState<string | null>(null);

    // Form State
    const [newName, setNewName] = useState('');
    const [newTopic, setNewTopic] = useState('');
    const [newIntensity, setNewIntensity] = useState('Deep Work');
    const [newColor, setNewColor] = useState('border-blue-500/20');

    const handleCreate = () => {
        if (!newName || !newTopic) return;

        const newGroup: Group = {
            id: Math.random().toString(36).substr(2, 9),
            name: newName,
            topic: newTopic,
            intensity: newIntensity,
            color: newColor,
            members: 1,
            active: 1,
            isOwner: true,
            isJoined: true
        };

        setGroups([newGroup, ...groups]);
        setJoinedGroupId(newGroup.id);
        setIsCreating(false);
        setNewName('');
        setNewTopic('');
    };

    const handleJoin = (id: string) => {
        setGroups(groups.map(g => {
            if (g.id === id && !g.isJoined) {
                return { ...g, active: g.active + 1, isJoined: true };
            }
            return g;
        }));
        setJoinedGroupId(id);
    };

    const handleLeave = (id: string = '') => {
        const targetId = id || joinedGroupId;
        setGroups(groups.map(g => {
            if (g.id === targetId && g.isJoined) {
                return { ...g, active: Math.max(0, g.active - 1), isJoined: false };
            }
            return g;
        }));
        setJoinedGroupId(null);
    };

    const handleDelete = (id: string) => {
        setGroups(groups.filter(g => g.id !== id));
        if (joinedGroupId === id) setJoinedGroupId(null);
    };

    const joinedGroup = groups.find(g => g.id === joinedGroupId);

    return (
        <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-8 overflow-y-auto custom-scrollbar h-full px-4 relative">
            <header className="flex justify-between items-end shrink-0">
                <div>
                    <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-2">Collaboration</h2>
                    <h1 className="text-4xl font-bold tracking-tighter">Study Groups</h1>
                </div>
                {!joinedGroupId && (
                    <button 
                        onClick={() => setIsCreating(true)}
                        className="btn-primary flex items-center gap-2 group"
                    >
                        <UserPlus size={16} className="group-hover:rotate-12 transition-transform" />
                        <span>Create Group</span>
                    </button>
                )}
            </header>

            {/* Active Session Overlay/Header */}
            <AnimatePresence>
                {joinedGroupId && joinedGroup && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="panel p-6 bg-[var(--color-bg-tertiary)] border-[var(--color-accent)] shadow-[0_0_30px_rgba(230,213,188,0.1)] flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-primary)] flex items-center justify-center text-[var(--color-accent)] animate-pulse">
                                <Zap size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold tracking-tight text-lg">{joinedGroup.name}</h3>
                                    {joinedGroup.isOwner && <Crown size={14} className="text-yellow-500" />}
                                </div>
                                <p className="text-xs opacity-40 uppercase tracking-widest">{joinedGroup.active} people focusing with you</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {joinedGroup.isOwner ? (
                                <button 
                                    onClick={() => handleDelete(joinedGroup.id)}
                                    className="px-6 py-2 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-red-500/20 transition-all border border-red-500/20"
                                >
                                    End Session
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleLeave()}
                                    className="btn-outline !px-6 !py-2"
                                >
                                    Leave Room
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {joinedGroupId && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <h3 className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40">Live in Room</h3>
                        </div>
                        <span className="text-[10px] opacity-30 italic">Synchronized focus active</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {ONLINE_MEMBERS.map((member, i) => (
                            <motion.div 
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="panel p-4 flex flex-col items-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-white/5"
                            >
                                <div className="relative">
                                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border border-white/10 grayscale-[0.3] group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--color-bg-primary)] rounded-full" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-bold tracking-tight">{member.name}</p>
                                    <p className="text-[9px] uppercase tracking-widest opacity-40 font-black">{member.status}</p>
                                </div>
                            </motion.div>
                        ))}
                        <div className="panel p-4 flex flex-col items-center justify-center gap-2 border-dashed opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                            <div className="w-10 h-10 rounded-full border border-dashed flex items-center justify-center"><UserPlus size={16} /></div>
                            <span className="text-[9px] uppercase font-black">Invite</span>
                        </div>
                    </div>
                </div>
            )}

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {groups.map((group, i) => (
                    <motion.div
                        key={group.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -4 }}
                        className={`panel p-8 relative overflow-hidden group cursor-pointer transition-all border-2 ${group.id === joinedGroupId ? 'border-[var(--color-accent)] bg-[var(--color-bg-tertiary)]' : group.color} ${group.isJoined && group.id !== joinedGroupId ? 'opacity-40 pointer-events-none' : ''}`}
                        onClick={() => !joinedGroupId && handleJoin(group.id)}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-[var(--color-bg-tertiary)] rounded-xl text-[var(--color-accent)]">
                                {group.isOwner ? <Crown size={24} /> : <Users size={24} />}
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                                    {group.active} Live
                                </div>
                                {group.isJoined && group.id === joinedGroupId && (
                                    <span className="text-[9px] uppercase tracking-tighter bg-[var(--color-accent)] text-[var(--color-bg-primary)] px-2 py-0.5 rounded-sm font-black">Connected</span>
                                )}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors">{group.name}</h3>
                        <p className="text-sm opacity-50 mb-6">{group.topic}</p>

                        <div className="flex items-center gap-6 mt-auto">
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="opacity-40" />
                                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{group.intensity}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[var(--color-accent)]">
                                <MessageSquare size={14} className="opacity-60" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">{group.members} Members</span>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)] opacity-[0.02] rounded-full -mr-16 -mt-16 group-hover:opacity-[0.05] transition-opacity" />
                    </motion.div>
                ))}
            </section>

            {/* Creation Modal */}
            <AnimatePresence>
                {isCreating && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreating(false)}
                            className="absolute inset-0 bg-[var(--color-bg-primary)]/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-xl panel p-10 shadow-2xl border-[var(--color-border-dim)]"
                        >
                            <button 
                                onClick={() => setIsCreating(false)}
                                className="absolute top-6 right-6 p-2 opacity-40 hover:opacity-100 transition-opacity"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-bold tracking-tighter mb-8">Establish Focused Space</h2>

                            <div className="flex flex-col gap-8">
                                <section className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Identify Group Name</label>
                                    <input 
                                        type="text" 
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="e.g. Deep Work Collective"
                                        className="bg-[var(--color-bg-primary)] border border-[var(--color-border-dim)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-all"
                                    />
                                </section>

                                <section className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Primary Focus Topic</label>
                                    <input 
                                        type="text" 
                                        value={newTopic}
                                        onChange={(e) => setNewTopic(e.target.value)}
                                        placeholder="e.g. Creative Coding & UI Engineering"
                                        className="bg-[var(--color-bg-primary)] border border-[var(--color-border-dim)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-all"
                                    />
                                </section>

                                <div className="grid grid-cols-2 gap-6">
                                    <section className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Pace Intensity</label>
                                        <select 
                                            value={newIntensity}
                                            onChange={(e) => setNewIntensity(e.target.value)}
                                            className="bg-[var(--color-bg-primary)] border border-[var(--color-border-dim)] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[var(--color-accent)] appearance-none"
                                        >
                                            <option>Deep Work</option>
                                            <option>Flow State</option>
                                            <option>Silent Library</option>
                                            <option>Casual</option>
                                        </select>
                                    </section>

                                    <section className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Aura Theme</label>
                                        <div className="flex gap-2">
                                            {[
                                                'border-blue-500/20',
                                                'border-orange-500/20',
                                                'border-purple-500/20',
                                                'border-[var(--color-accent)]/20'
                                            ].map(c => (
                                                <button
                                                    key={c}
                                                    onClick={() => setNewColor(c)}
                                                    className={`w-8 h-8 rounded-lg border-2 transition-all ${c} ${newColor === c ? 'scale-110 border-4 bg-white/5' : 'opacity-40 hover:opacity-100'}`}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                <button 
                                    onClick={handleCreate}
                                    className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 mt-4"
                                >
                                    <Check size={18} />
                                    <span>Establish Group</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <section className="mt-8 mb-12">
                <div className="panel-dark p-8 border-dashed border-2 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-[var(--color-bg-primary)] flex items-center justify-center border border-[var(--color-border-dim)]">
                            <ShieldCheck className="opacity-40" />
                        </div>
                        <div>
                            <h4 className="font-bold tracking-tight">Verified Study Sessions</h4>
                            <p className="text-xs opacity-40">Join moderated sessions to maximize focus and minimize distractions.</p>
                        </div>
                    </div>
                    <button className="btn-outline">Browse All Sessions</button>
                </div>
            </section>
        </div>
    );
}
