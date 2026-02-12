import React from 'react';
import { Shield, Lock, EyeOff, Server } from 'lucide-react';
import { motion } from 'framer-motion';

function Security() {
    const securityFeatures = [
        {
            title: "Banking-Grade Encryption",
            desc: "Your financial data is protected by 256-bit AES encryption both in transit and at rest.",
            icon: <Lock className="text-orange-500" size={24} />
        },
        {
            title: "Private & Anonymous",
            desc: "We prioritize your privacy. Your bill data is processed anonymously and never sold to third parties.",
            icon: <EyeOff className="text-amber-400" size={24} />
        },
        {
            title: "Secure Cloud Core",
            desc: "Hosted on resilient, distributed cloud nodes to ensure maximum availability and data integrity.",
            icon: <Server className="text-orange-600" size={24} />
        }
    ];

    return (
        <section id="security" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-8 border border-orange-500/20">
                            <Shield size={32} />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Your Financial Data is <span className="text-orange-600">Strictly Yours.</span></h2>
                        <p className="text-lg text-slate-500 mb-8 leading-relaxed font-medium">
                            We understand the sensitive nature of your bills. That's why SmartBill is built with a security-first architecture to protect your personal and financial information.
                        </p>
                        <div className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50 rounded-2xl shadow-sm lg:inline-flex">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-600">
                                <Shield size={20} />
                            </div>
                            <span className="font-bold text-slate-900 text-sm uppercase tracking-widest">ISO 27001 Certified Infrastructure</span>
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 gap-6">
                        {securityFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-sm flex gap-8 hover:bg-white hover:border-orange-500/2 transition-all duration-500 group"
                            >
                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{feature.title}</h4>
                                    <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Security;
