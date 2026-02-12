import React from 'react';
import { Upload, Cpu, MessageCircleMore, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

function HowItWorks() {
    const steps = [
        {
            title: 'Scan Your Bill',
            desc: 'Take a photo or upload a PDF of your utility bill. We handle the rest.',
            icon: <Upload size={32} />
        },
        {
            title: 'AI Analysis',
            desc: 'Our SmartBill engine extracts hidden taxes and compares rates with regional averages.',
            icon: <Cpu size={32} />
        },
        {
            title: 'Receive Savings',
            desc: 'Get an itemized tax breakdown and actionable steps to reduce your next bill.',
            icon: <MessageCircleMore size={32} />
        },
    ];

    return (
        <section id="how" className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-black text-slate-900 mb-6">How SmartBill Works</h2>
                    <p className="text-lg text-slate-500 font-medium">
                        Three simple steps to decoding your expenses and finding savings.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -translate-y-1/2 hidden lg:block"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-xl shadow-orange-500/5 flex items-center justify-center text-orange-600 mb-10 border border-slate-100 relative group-hover:scale-110 group-hover:border-orange-500/30 transition-all duration-500">
                                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-700 text-white flex items-center justify-center font-black text-sm shadow-xl shadow-orange-500/30">
                                        {index + 1}
                                    </div>
                                    {step.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{step.title}</h4>
                                <p className="text-slate-500 max-w-xs font-medium leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
