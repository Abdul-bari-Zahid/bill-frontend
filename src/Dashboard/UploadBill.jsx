
import { useState } from "react";
import { API } from "../api";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FileUp, Sparkles, CheckCircle, Download, PieChart as PieChartIcon, IndianRupee, Lightbulb, Wallet, Calculator, Info } from "lucide-react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
function UploadBill() {
  const [file, setFile] = useState(null);
  const [billType, setBillType] = useState("");
  const [billResult, setBillResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return toast.error("Please select a file");
    if (!billType) return toast.error("Select bill type");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("billType", billType);

    try {
      const res = await API.post("/bills/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Bill analyzed ✅");
      setBillResult(res.data.bill);
    } catch (err) {
      toast.error(err.response?.data?.error || "Analysis failed ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!billResult) return;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 120, 0);
    doc.text("SmartBill", 105, 15, null, null, "center");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Savings Optimizer & Tax Analysis", 105, 22, null, null, "center");

    doc.setDrawColor(200);
    doc.line(15, 28, 195, 28);

    // Bill Info
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("Bill Breakdown", 14, 35);

    autoTable(doc, {
      startY: 38,
      head: [['Field', 'Value']],
      body: [
        ['Bill Category', billResult.billType],
        ['Total Amount', `Rs ${billResult.totalAmount}`],
        ...billResult.taxes.map(t => [t.name, `Rs ${t.amount}`])
      ],
      theme: 'striped',
      headStyles: { fillColor: [255, 120, 0], textColor: 255 },
      styles: { fontSize: 10 }
    });

    // AI Suggestions
    let finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60;
    doc.setFontSize(14);
    doc.setTextColor(255, 120, 0);
    doc.text("Savings Advice", 14, finalY);

    doc.setFontSize(10);
    doc.setTextColor(50);
    const splitText = doc.splitTextToSize(billResult.suggestions || "-", 180);
    doc.text(splitText, 14, finalY + 6);

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text(`SmartBill AI – Analyze & Save`, 105, pageHeight - 10, null, null, "center");

    doc.save(`SmartBill_${billResult.billType}.pdf`);
  };

  return (
    <div className="p-8 max-w-[90%] md:max-w-3xl mx-auto bg-white border border-slate-100 shadow-2xl rounded-3xl mt-10 text-slate-900 animate-in zoom-in duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500">
          <FileUp size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Upload Bill</h2>
          <p className="text-slate-400 text-sm">Scan your bill for tax breakdown & savings.</p>
        </div>
      </div>

      <form onSubmit={handleUpload} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-400 mb-2">Select Bill File (PDF or Image)</label>
          <div className="relative group">
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-500 transition-all cursor-pointer bg-slate-50 border border-slate-200 rounded-xl p-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-400 mb-2">Bill Type</label>
          <select
            value={billType}
            onChange={(e) => setBillType(e.target.value)}
            className="block w-full bg-slate-50 border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all cursor-pointer appearance-none text-slate-800"
          >
            <option value="">Select Type</option>
            <option>Electricity</option>
            <option>Water</option>
            <option>Gas</option>
            <option>Internet</option>
            <option>Phone</option>
            <option>Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white py-4 rounded-xl w-full font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyzing Bill...
            </span>
          ) : (
            <>
              Analyze Now
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            </>
          )}
        </button>
      </form>

      {billResult && (
        <div className="mt-10 space-y-8 animate-in slide-in-from-bottom duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <CheckCircle className="text-orange-500" size={28} />
              Analysis Result
            </h3>
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
              >
                <Download size={18} /> PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Summary & Preview */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                      <Calculator size={32} />
                    </div>
                    <div>
                      <div className="px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest w-fit mb-2">
                        {billResult.billType}
                      </div>
                      <h4 className="text-4xl font-black text-slate-900">
                        Rs {billResult.totalAmount}
                      </h4>
                      <p className="text-slate-400 font-medium">Total Amount Extracted</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h5 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                    <Sparkles size={16} className="text-orange-500" /> AI Summary
                  </h5>
                  <p className="text-slate-600 italic leading-relaxed">
                    {billResult.aiSummary}
                  </p>
                </div>

                {billResult.analysis && (
                  <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                    <h5 className="flex items-center gap-2 font-bold text-orange-700 mb-3">
                      <Info size={16} /> Why is your bill high?
                    </h5>
                    <p className="text-orange-700/80 leading-relaxed font-medium whitespace-pre-line">
                      {billResult.analysis}
                    </p>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {billResult.suggestions?.length > 0 && (
                <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Lightbulb className="text-orange-500" /> Savings Strategies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {billResult.suggestions.map((s, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3">
                        <div className="mt-1 w-2 h-2 bg-orange-500 rounded-full shrink-0"></div>
                        <p className="text-sm text-slate-600 font-medium leading-snug">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tax Table */}
              {billResult.taxes?.length > 0 && (
                <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Calculator className="text-orange-500" /> Charge Breakdown
                  </h3>
                  <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4 text-xs">Description</th>
                          <th className="px-6 py-4 text-right text-xs">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {billResult.taxes.map((tax, i) => (
                          <tr key={i} className="text-slate-600 hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-sm">{tax.name}</td>
                            <td className="px-6 py-4 text-right font-black text-slate-900 text-sm">Rs {tax.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Charts & Preview */}
            <div className="space-y-8">
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                  <PieChartIcon size={18} className="text-orange-500" /> Cost Distribution
                </h3>
                <div className="h-64 flex items-center justify-center">
                  {billResult.taxes?.length > 0 ? (
                    <Pie
                      data={{
                        labels: billResult.taxes.map(t => t.name),
                        datasets: [{
                          data: billResult.taxes.map(t => t.amount),
                          backgroundColor: [
                            'rgba(249, 115, 22, 0.8)',
                            'rgba(251, 146, 60, 0.8)',
                            'rgba(253, 186, 116, 0.8)',
                            'rgba(15, 23, 42, 0.8)',
                            'rgba(71, 85, 105, 0.8)'
                          ],
                          borderWidth: 0
                        }]
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { position: 'bottom', labels: { usePointStyle: true, font: { weight: 'bold' } } }
                        }
                      }}
                    />
                  ) : (
                    <p className="text-slate-400 text-sm italic">No breakdown available.</p>
                  )}
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm overflow-hidden group">
                <img
                  src={billResult.fileUrl}
                  alt="Bill Preview"
                  className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => window.open(billResult.fileUrl, '_blank')}
                />
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Wallet size={24} className="text-orange-400" />
                  </div>
                  <h4 className="font-black">Smart Tip</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Saving just 10% on your monthly bill adds up to Rs {(billResult.totalAmount * 1.2).toFixed(2)} per year!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBill;
