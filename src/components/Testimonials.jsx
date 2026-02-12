import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

function Testimonials() {
    const testimonials = [
        {
            name: "Zahid Ahmed",
            role: "Small Business Owner",
            content: "SmartBill helped me find Rs 200 of hidden taxes in my shop's commercial electricity bill. The AI suggestions for off-peak usage are spot on.",
            rating: 5,
            avatar: "ZA"
        },
        {
            name: "Maria Khan",
            role: "Homeowner",
            content: "I used to ignore the fine print on my utility bills. SmartBill breaks down every tax and fee in Roman Urdu, making it so easy to understand.",
            rating: 5,
            avatar: "MK"
        },
        {
            name: "Usman Raza",
            role: "Financial Analyst",
            content: "The level of detail in the tax distribution charts is impressive. It's a must-have tool for anyone serious about monthly budgeting.",
            rating: 5,
            avatar: "UR"
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-3">Testimonials</h2>
                    <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Trusted by Homeowners & Businesses</h3>
                    <p className="text-lg text-slate-500 font-medium">
                        See how SmartBill is helping thousands of users optimize their utility spending every day.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-start relative hover:bg-white hover:border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 group"
                        >
                            <Quote className="absolute top-8 right-10 text-orange-500/10 group-hover:text-orange-500/20 transition-colors" size={64} />

                            <div className="flex gap-1 mb-8">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-slate-600 leading-relaxed mb-10 italic font-medium">"{t.content}"</p>

                            <div className="mt-auto flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/20">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 tracking-tight">{t.name}</div>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
