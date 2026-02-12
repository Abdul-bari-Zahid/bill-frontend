import { useState } from "react";
import { Calculator, Wallet, TrendingUp, Sparkles, Users } from "lucide-react";
import toast from "react-hot-toast";

function SavingsCalculator() {
    const [currentSpent, setCurrentSpent] = useState("");
    const [projectedSavings, setProjectedSavings] = useState(15); // Default 15%

    const yearlySavings = (parseFloat(currentSpent) || 0) * (projectedSavings / 100) * 12;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <div className="max-w-5xl mx-auto space-y-10">

                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-widest border border-orange-500/20">
                        <Calculator size={14} /> Financial Toolkit
                    </div>
                    <h1 className="text-5xl font-black text-slate-900">Project Your Savings</h1>
                    <p className="text-slate-500 max-w-xl mx-auto font-medium">Use our projection model to see how much you could save annually with SmartBill Optimization.</p>
                </div>

                <div className="grid grid-cols-1 gap-10">

                    {/* Calculator Card */}
                    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-8">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Wallet className="text-orange-500" /> Savings Estimator
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-3 block">Avg. Monthly Spending (Rs)</label>
                                <input
                                    type="number"
                                    value={currentSpent}
                                    onChange={(e) => setCurrentSpent(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all text-xl font-mono text-slate-900"
                                    placeholder="Ex: 45000"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-slate-400 text-sm font-bold uppercase tracking-widest">Optimization Level: {projectedSavings}%</label>
                                    <span className="text-orange-600 text-xs font-black">AI AVG: 18%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="40"
                                    value={projectedSavings}
                                    onChange={(e) => setProjectedSavings(e.target.value)}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1">Total Yearly Savings</p>
                            <div className="text-6xl font-black text-orange-600 mb-2">Rs {yearlySavings.toLocaleString()}</div>
                            <p className="text-slate-500 text-sm">That's enough to pay for 2 months of utilities!</p>
                        </div>
                    </div>

                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <TrendingUp className="text-orange-600 mb-2" size={24} />
                        <h4 className="text-slate-900 font-bold mb-1">ROI Analysis</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">Most users see a 12% reduction in taxes within the first 3 months of using AI suggestions.</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Sparkles className="text-amber-500 mb-2" size={24} />
                        <h4 className="text-slate-900 font-bold mb-1">Smart Prompts</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">Our AI learns from usage patterns to detect seasonal savings opportunities automatically.</p>
                    </div>
                    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                        <Users className="text-orange-600 mb-2" size={24} />
                        <h4 className="text-slate-900 font-bold mb-1">Community Insights</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">Compare your savings projections with other users in your region for better benchmarking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SavingsCalculator;
