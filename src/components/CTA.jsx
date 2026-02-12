import { Link } from "react-router-dom";
import { ArrowRight, FileUp } from "lucide-react";
import { motion } from "framer-motion";

function CTA() {
    return (
        <section id="get-started" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-[3rem] bg-orange-600 text-white p-12 lg:p-20 relative overflow-hidden shadow-2xl shadow-orange-500/20"
                >
                    {/* Abstract background shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                        <h3 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                            Ready to take control of <br />
                            <span className="text-amber-300">your savings journey?</span>
                        </h3>
                        <p className="text-xl text-orange-50 mb-12 max-w-2xl leading-relaxed">
                            Join thousands of users who trust SmartBill for clear, actionable financial document interpretations. All processed securely and instantly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link to="/upload-bill" className="px-10 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center gap-2 group shadow-lg">
                                <FileUp size={20} />
                                Upload Your Bill
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="px-10 py-4 bg-orange-500/20 hover:bg-orange-500/30 border border-white/20 rounded-2xl font-bold transition-all text-center">
                                Create Free Account
                            </Link>
                        </div>

                        <p className="mt-8 text-orange-100/60 text-sm font-medium">
                            No credit card required • Secure Analysis • Free forever for individuals
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CTA;
