import { FileSearch, ShieldCheck, Zap, MessageSquare, LineChart, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

function Features() {
    const items = [
        {
            title: 'Tax Breakdown',
            desc: 'Automatically itemize hidden taxes and service charges into clear, categorized insights.',
            icon: <FileSearch className="text-orange-500" size={24} />,
            color: 'bg-orange-500/10'
        },
        {
            title: 'Savings Optimizer',
            desc: 'Get AI-driven tips on reducing your utility consumption based on historical patterns.',
            icon: <Zap className="text-amber-500" size={24} />,
            color: 'bg-amber-500/10'
        },
        {
            title: 'Secure Vault',
            desc: 'Banking-grade encryption ensures your financial records are safe and strictly private.',
            icon: <ShieldCheck className="text-orange-600" size={24} />,
            color: 'bg-orange-600/10'
        },
        {
            title: 'Bilingual Insights',
            desc: 'Get complex financial terms explained in both English and Roman Urdu for clarity.',
            icon: <MessageSquare className="text-amber-600" size={24} />,
            color: 'bg-amber-600/10'
        },
        {
            title: 'Trend Analysis',
            desc: 'Monitor your spending over the last 6 months with interactive, beautiful charts.',
            icon: <LineChart className="text-orange-500" size={24} />,
            color: 'bg-orange-500/10'
        },
        {
            title: 'Budget Alerts',
            desc: 'Set custom thresholds and get notified before you exceed your monthly budget.',
            icon: <Bell className="text-amber-500" size={24} />,
            color: 'bg-amber-500/10'
        },
    ];

    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-3"
                    >
                        Our Features
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Master Your Utility Bills
                    </motion.h3>
                    <p className="text-lg text-slate-500">
                        A suite of AI-powered financial tools built to save you money and simplify your taxes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h4>
                            <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[80px] group-hover:bg-orange-500/10 transition-colors"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
