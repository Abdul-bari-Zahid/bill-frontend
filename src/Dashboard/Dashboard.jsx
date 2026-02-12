import React, { useEffect, useState } from "react";
import { UploadCloud, Activity, Brain, FileText, PlusCircle, TrendingUp, AlertTriangle, ChevronRight, Wallet, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../api";
import toast from "react-hot-toast";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bills, setBills] = useState([]);
  const [customBills, setCustomBills] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState(50000);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user info
    API.get("/users/dashboard")
      .then(res => setUser(res.data.user))
      .catch(err => {
        console.error("Error fetching user data:", err);
        navigate("/login");
      });

    // Fetch recent bills
    API.get("/bills/user")
      .then(res => setBills(res.data.slice(0, 5)))
      .catch(err => console.error(err));

    // Fetch recent optimization data
    API.get("/bill-suggestions")
      .then(res => setCustomBills(res.data.slice(0, 5)))
      .catch(err => console.error(err));
  }, [navigate]);

  const totalSpent = bills.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalSavings = customBills.reduce((acc, curr) => acc + (curr.savingsEstimate || 0), 0);

  // Chart Data
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: 'Spending Trend',
      data: [450, 480, totalSpent || 520, 510, 490, 470],
      fill: true,
      backgroundColor: 'rgba(255, 120, 0, 0.1)',
      borderColor: '#ff7800',
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#ff7800',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-12 px-6 md:px-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Hey, {user?.email?.split('@')[0]} <span className="text-orange-500">.</span>
          </h1>
          <p className="text-slate-400 font-medium">Your financial health at a glance.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link to="/upload-bill" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/10 flex items-center gap-2">
            <PlusCircle size={20} /> Analyze Bill
          </Link>
          <Link to="/bill-optimizer" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-sm">
            <Target size={20} className="text-orange-500" /> Optimize Savings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-slate-100 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet size={80} />
          </div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Total Monthly Bill</p>
          <h3 className="text-4xl font-black text-slate-900 mb-2">Rs {totalSpent.toFixed(2)}</h3>
          <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
            <TrendingUp size={16} /> +12% from last month
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="p-8 rounded-3xl bg-white border border-slate-100 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} />
          </div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Est. Savings Found</p>
          <h3 className="text-4xl font-black text-orange-600 mb-2">Rs {totalSavings.toFixed(2)}</h3>
          <div className="flex items-center gap-2 text-orange-500 text-sm font-bold">
            <Activity size={16} /> Active AI Scanning
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="lg:col-span-2 p-8 rounded-3xl bg-white border border-slate-100 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-slate-900 font-bold flex items-center gap-2">
              <Activity size={18} className="text-orange-500" /> Spending Trend
            </h4>
            <span className="text-xs text-slate-500 font-bold">PROJECTION VIEW</span>
          </div>
          <div className="h-24">
            <Line data={trendData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Recent Bills */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Recent Analysis</h2>
            <Link to="/bill-history" className="text-orange-500 text-sm font-bold flex items-center gap-1 hover:underline">
              View History <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {bills.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/50 rounded-3xl border border-slate-800">
                <p className="text-slate-500 font-medium">No bills uploaded yet.</p>
              </div>
            ) : (
              bills.map(b => (
                <div key={b._id} className="bg-white border border-slate-100 p-6 rounded-3xl flex items-center justify-between hover:bg-orange-50/50 transition-colors group shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{b.billType}</h4>
                      <p className="text-slate-500 text-xs font-bold">{new Date(b.billDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-bold">AMOUNT</p>
                      <p className="font-black text-slate-900">Rs {b.totalAmount}</p>
                    </div>
                    <button onClick={() => navigate(`/bills/${b._id}`)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                      <ChevronRight size={20} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar: Alerts & Optimizer */}
        <div className="space-y-8">

          {/* Budget Alert Card */}
          <div className={`p-8 rounded-3xl border-2 transition-all ${totalSpent > budgetLimit ? "bg-red-500/5 border-red-500/20" : "bg-white border-slate-100 shadow-sm"}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-slate-900 flex items-center gap-2">
                <AlertTriangle size={20} className={totalSpent > budgetLimit ? "text-red-500" : "text-slate-400"} />
                Budget Alert
              </h3>
              <div className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">Rs {budgetLimit} LIMIT</div>
            </div>

            {totalSpent > budgetLimit ? (
              <div className="space-y-4">
                <p className="text-red-600 text-sm font-medium leading-relaxed">
                  Warning: You have exceeded your monthly budget by <span className="font-bold">Rs {(totalSpent - budgetLimit).toFixed(2)}</span>.
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '100%' }}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  You are currently <span className="font-bold text-orange-600">Rs {(budgetLimit - totalSpent).toFixed(2)}</span> under your budget. Keep it up!
                </p>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${(totalSpent / budgetLimit) * 100}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* AI Optimizer Sneak Peek */}
          <div className="bg-gradient-to-br from-orange-500/5 to-amber-600/5 border border-orange-500/10 p-8 rounded-3xl">
            <h4 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
              <Brain size={18} className="text-orange-500" /> AI Quick Tip
            </h4>
            <p className="text-sm text-slate-500 italic leading-relaxed">
              "Switching to off-peak hours for your laundry could save you an additional Rs 1200 on your next electricity bill."
            </p>
            <button onClick={() => navigate('/bill-optimizer')} className="mt-6 w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all text-xs shadow-md shadow-orange-500/20">
              TRY OPTIMIZER
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
