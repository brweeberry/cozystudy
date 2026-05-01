import React, { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');

    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            text: input.trim(),
            completed: false
        };
        setTasks([...tasks, newTask]);
        setInput('');
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="flex flex-col h-full overflow-hidden" id="task-list">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">Checklist</h3>
                <button 
                  onClick={() => document.getElementById('task-input')?.focus()}
                  className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity"
                >
                  + Add
                </button>
            </div>

            <form onSubmit={addTask} className="relative mb-6 shrink-0 group">
                <input 
                    id="task-input"
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Focus objective..." 
                    className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-dim)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-all pr-10 text-[var(--color-accent)] placeholder:opacity-20"
                />
                <button 
                    type="submit"
                    className="absolute right-2 top-1.5 p-1 text-[var(--color-accent)] opacity-40 group-hover:opacity-100 transition-opacity"
                >
                    <Plus size={16} />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {tasks.length === 0 ? (
                        <div className="text-center italic text-xs py-10 opacity-20">
                            No active items.
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <motion.div 
                                key={task.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="group flex items-start gap-3"
                            >
                                <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-4 h-4 border border-[var(--color-accent)] rounded mt-0.5 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                                        task.completed 
                                        ? "bg-[var(--color-accent)] shadow-[0_0_8px_rgba(230,213,188,0.4)]" 
                                        : "bg-transparent hover:border-white/40"
                                    }`}
                                >
                                    <AnimatePresence>
                                        {task.completed && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            >
                                                <Check size={10} stroke="#121110" strokeWidth={4} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                                <span className={`text-sm leading-tight flex-1 transition-opacity ${task.completed ? "line-through opacity-40" : "opacity-80"}`}>
                                    {task.text}
                                </span>
                                <button 
                                    onClick={() => deleteTask(task.id)}
                                    className="opacity-0 group-hover:opacity-40 p-1 text-[var(--color-accent)] hover:text-red-400 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
