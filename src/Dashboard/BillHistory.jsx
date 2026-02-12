import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API } from "../api";
import { Clock, CheckCircle, TrendingDown, FileText, ArrowLeft, Plus } from "lucide-react";

function BillHistory() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    setLoading(true);
    try {
      // Fetch optimization logs
      const customRes = await API.get("/bill-suggestions");

      // Fetch Analysis logs
      const billsRes = await API.get("/bills/user");

      // Combine data
      const customTimeline = customRes.data.map(v => ({
        date: new Date(v.createdAt),
        title: `${v.billCategory} Optimization`,
        text: `Savings Found: Rs ${v.savingsEstimate}`,
        type: "savings",
        id: v._id
      }));

      const billsTimeline = billsRes.data.map(r => ({
        date: new Date(r.billDate),
        title: `${r.billType} Analysis`,
        text: `Total Amount: Rs ${r.totalAmount}`,
        type: "analysis",
        id: r._id
      }));

      // Merge & sort by date descending
      const combined = [...customTimeline, ...billsTimeline].sort((a, b) => b.date - a.date);

      setTimeline(combined);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch history ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              <Clock className="text-orange-500" /> History
            </h2>
            <p className="text-slate-400 font-medium">Your financial insights timeline.</p>
          </div>
          <Link
            to="/upload-bill"
            className="bg-orange-600 hover:bg-orange-500 text-white p-3 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-orange-500/20"
          >
            <Plus size={24} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : timeline.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <p className="text-slate-400 font-medium">No history found. Start by analyzing a bill.</p>
          </div>
        ) : (
          <div className="relative space-y-8 before:absolute before:left-6 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-200">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-10 group">
                <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${item.type === 'savings' ? 'bg-orange-500/10 text-orange-600 border border-orange-500/20' : 'bg-orange-500/10 text-orange-600 border border-orange-500/20'
                  }`}>
                  {item.type === 'savings' ? <TrendingDown size={20} /> : <FileText size={20} />}
                </div>

                <div className="w-full bg-white border border-slate-100 p-6 rounded-3xl hover:border-orange-200 transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {item.type === 'analysis' && (
                      <button
                        onClick={() => navigate(`/bills/${item.id}`)}
                        className="text-orange-600 text-xs font-bold hover:underline"
                      >
                        VIEW DETAILS
                      </button>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold transition-colors"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
export default BillHistory;