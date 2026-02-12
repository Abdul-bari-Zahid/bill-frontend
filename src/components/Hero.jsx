

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, CheckCircle, Activity } from "lucide-react";
import heroImg from "../assets/21.jpg";
import { Link } from 'react-router-dom';

function Hero() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoggedIn(!!token);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-50/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        className="lg:w-1/2 text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-semibold mb-6 border border-orange-500/20"
                        >
                            <Sparkles size={16} />
                            <span>AI-Powered Bill Optimization</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6"
                        >
                            Your Bills, <br />
                            <span className="gradient-text italic font-extrabold uppercase tracking-tighter">Smartly Optimized.</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed"
                        >
                            SmartBill analyzes your taxes, breaks down costs, and suggests ways to save. Get clear insights into your utility spending in seconds.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                            {!loggedIn ? (
                                <Link to="/login" className="btn-primary flex items-center gap-2 group">
                                    Start Saving Now
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <Link to="/upload-bill" className="btn-primary flex items-center gap-2 group">
                                    Upload Your Bill
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                            <Link to="/bill-optimizer" className="btn-secondary flex items-center gap-2 group">
                                <Activity size={18} />
                                Manual Optimizer
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-12 flex items-center gap-6 text-sm text-slate-500 font-medium"
                        >
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-orange-500" />
                                <span>Tax Breakdown</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-orange-500" />
                                <span>AI Suggestions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-orange-500" />
                                <span>Roman Urdu Support</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-orange-50 backdrop-blur-sm">
                            <img
                                src={heroImg}
                                alt="Financial AI"
                                className="w-full h-auto object-cover max-h-[600px] hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent"></div>
                        </div>

                        {/* Floating Glass Cards */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl z-20 hidden md:block border border-orange-100 shadow-2xl"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Savings Found</div>
                                    <div className="text-lg font-bold text-orange-600 italic">"Save Rs 15,000/mo"</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl z-20 hidden md:block border border-orange-100 shadow-2xl"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <div className="flex flex-col gap-1">
                                <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-orange-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: "85%" }}
                                        transition={{ delay: 1.5, duration: 1 }}
                                    />
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase">Optimization Score: 85%</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
