import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import logo from '../../public/ai-doctor-assistant.png'
import { FileText } from "lucide-react";
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                                <FileText className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">SmartBill</span>
                        </Link>
                        <p className="text-slate-500 mb-6 leading-relaxed">
                            Your intelligent bill optimization companion. Understanding your utility spending has never been easier.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-orange-500 hover:border-orange-100 transition-all">
                                <Github size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-orange-400 hover:border-orange-100 transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-orange-600 hover:border-orange-100 transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Product</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li><a href="#features" className="hover:text-orange-600 transition-colors">Features</a></li>
                            <li><a href="#how" className="hover:text-orange-600 transition-colors">How it Works</a></li>
                            <li><Link to="/upload-bill" className="hover:text-orange-600 transition-colors">Upload Bill</Link></li>
                            <li><Link to="/dashboard" className="hover:text-orange-600 transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li><a href="#" className="hover:text-orange-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Career</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a></li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:support@smartbill.ai" className="hover:text-orange-600 transition-colors">support@smartbill.ai</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400 font-medium">
                    <div>© {currentYear} SmartBill. All rights reserved.</div>
                    <div className="text-center md:text-right">
                        Use AI to optimize your utility bills and save money.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
