import { useEffect, useState } from "react";
import { Bot, FileText, Download, Eye, LayoutGrid, Search, ArrowLeft, TrendingDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { API } from "../api";

function MyBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const res = await API.get("/bills/user");
      setBills(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bills ❌");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (bill) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 120, 0);
    doc.text("SmartBill", 105, 15, null, null, "center");

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Savings Optimizer Analysis", 105, 22, null, null, "center");
    doc.line(15, 28, 195, 28);

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`${bill.billType} - ${new Date(bill.billDate).toLocaleDateString()}`, 15, 40);

    autoTable(doc, {
      startY: 45,
      head: [['Field', 'Value']],
      body: [
        ['Total Amount', `Rs ${bill.totalAmount}`],
        ...bill.taxes.map(t => [t.name, `Rs ${t.amount}`])
      ],
      theme: 'grid',
    });

    let finalY = doc.lastAutoTable.finalY + 10;
    const splitText = doc.splitTextToSize(bill.aiSummary || "", 180);
    doc.setFontSize(10);
    doc.text(splitText, 15, finalY);

    doc.save(`SmartBill_${bill.billType}_${bill._id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              <LayoutGrid className="text-orange-500" /> My Bills
            </h1>
            <p className="text-slate-400 font-medium mt-1">Archive of all analyzed financial documents.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500" />
              <input
                type="text"
                placeholder="Search bills..."
                className="bg-white border border-slate-200 py-3 pl-11 pr-6 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm font-medium text-slate-800"
              />
            </div>
            <Link to="/upload-bill" className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20">
              New Scan
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
          </div>
        ) : bills.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <p className="text-slate-400 font-medium">No bills analyzed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bills.map((bill) => (
              <div key={bill._id} className="bg-white border border-slate-100 p-6 rounded-3xl hover:border-orange-200 transition-all group flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
                      <FileText size={24} />
                    </div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{new Date(bill.billDate).toLocaleDateString()}</span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">
                      {bill.billType}
                    </h2>
                    <div className="text-2xl font-black text-slate-900 mt-1">Rs {bill.totalAmount}</div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-1 mb-2">
                      <Bot size={12} className="text-orange-500" /> AI Insights Preview
                    </h4>
                    <p className="text-slate-400 text-xs italic line-clamp-2">
                      "{bill.aiSummary || bill.suggestions}"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    onClick={() => downloadPDF(bill)}
                    className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 py-3 rounded-xl text-xs font-bold transition border border-slate-100"
                  >
                    <Download size={14} /> PDF
                  </button>
                  <button
                    onClick={() => navigate(`/bills/${bill._id}`)}
                    className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl text-xs font-bold transition shadow-md shadow-orange-500/20"
                  >
                    <Eye size={14} /> VIEW
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
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

export default MyBills;
