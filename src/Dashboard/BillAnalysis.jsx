import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bot, FileText, Download, ArrowLeft, PieChart as PieChartIcon, IndianRupee, Wallet, Calculator } from "lucide-react";
import { API } from "../api";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function BillAnalysis() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBill();
  }, [id]);

  const fetchBill = async () => {
    try {
      const res = await API.get(`/bills/${id}`);
      setBill(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bill analysis ❌");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format AI text with proper line breaks
  const formatAIText = (text) => {
    if (!text) return [];

    // Split on double newlines first (if they exist)
    let paragraphs = text.split('\n\n').filter(p => p.trim());

    // If no double newlines, try to intelligently split long text
    if (paragraphs.length === 1 && text.length > 200) {
      // Split on periods followed by capital letters or numbers
      const sentences = text.split(/\.\s+(?=[A-Z0-9])/);
      paragraphs = [];
      let currentPara = '';

      sentences.forEach((sentence, idx) => {
        currentPara += sentence + (idx < sentences.length - 1 ? '. ' : '');
        // Create new paragraph every 2-3 sentences or at natural breaks
        if ((idx + 1) % 3 === 0 || sentence.includes('Notably') || sentence.includes('Additionally')) {
          paragraphs.push(currentPara.trim());
          currentPara = '';
        }
      });

      if (currentPara) paragraphs.push(currentPara.trim());
    }

    return paragraphs.filter(p => p.trim());
  };

  const downloadPDF = () => {
    if (!bill) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 120, 0);
    doc.text("SmartBill Analysis", 105, 15, null, null, "center");

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report ID: ${bill._id}`, 105, 22, null, null, "center");
    doc.line(15, 28, 195, 28);

    autoTable(doc, {
      startY: 35,
      head: [['Category', 'Total Amount', 'Date']],
      body: [
        [bill.billType, `Rs ${bill.totalAmount}`, new Date(bill.billDate).toLocaleDateString()],
      ],
      theme: 'striped',
    });

    if (bill.taxes && bill.taxes.length > 0) {
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Tax Description', 'Amount']],
        body: bill.taxes.map(t => [t.name, `Rs ${t.amount}`]),
        theme: 'grid',
      });
    }

    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("AI Insights & Suggestions", 14, finalY);
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(bill.suggestions || bill.aiSummary || "No suggestions available.", 180);
    doc.text(splitText, 14, finalY + 6);

    doc.save(`SmartBill_Analysis_${bill.billType}.pdf`);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );

  if (!bill) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
      <p className="text-red-500 text-xl font-bold">Bill not found</p>
      <button onClick={() => navigate(-1)} className="text-orange-600 font-bold border-b border-orange-600">Go Back</button>
    </div>
  );

  // Prepare chart data for taxes
  const taxData = {
    labels: bill.taxes?.map(t => t.name) || [],
    datasets: [{
      data: bill.taxes?.map(t => t.amount) || [],
      backgroundColor: [
        'rgba(255, 120, 0, 0.6)',
        'rgba(255, 165, 0, 0.6)',
        'rgba(255, 140, 0, 0.6)',
        'rgba(255, 69, 0, 0.6)',
        'rgba(255, 215, 0, 0.6)'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors font-bold">
            <ArrowLeft size={20} /> Back to Bills
          </button>
          <div className="flex gap-4">
            <button onClick={downloadPDF} className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20">
              <Download size={18} /> Export Analysis
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 p-8 rounded-3xl space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500">
                    <FileText size={32} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-slate-900">{bill.billType} Analysis</h1>
                    <p className="text-slate-500 font-medium">Billed on {new Date(bill.billDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total Amount</span>
                  <div className="text-4xl font-black text-orange-600">Rs {bill.totalAmount}</div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Bot className="text-orange-500" /> AI Insights & Optimization
                </h3>
                <div className="space-y-6">
                  {/* Summary Section */}
                  {(bill.summary || bill.aiSummary) && (
                    <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-2xl border border-blue-100">
                      <h4 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Overview
                      </h4>
                      <div className="text-slate-700 leading-relaxed space-y-3">
                        {formatAIText(bill.summary || bill.aiSummary).map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Analysis Section */}
                  {bill.analysis && (
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                      <h4 className="text-sm font-bold text-orange-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        Why is your bill high?
                      </h4>
                      <div className="text-slate-700 leading-relaxed space-y-3">
                        {formatAIText(bill.analysis).map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions Section */}
                  {bill.suggestions && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                      <h4 className="text-sm font-bold text-green-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Money-Saving Suggestions
                      </h4>
                      {Array.isArray(bill.suggestions) ? (
                        <ul className="space-y-3">
                          {bill.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-slate-700 leading-relaxed flex-1">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                          {bill.suggestions}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Fallback if no structured data */}
                  {!bill.summary && !bill.aiSummary && !bill.analysis && !bill.suggestions && (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-slate-400 text-center italic">
                        Analysis in progress...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tax Table */}
            {bill.taxes && bill.taxes.length > 0 && (
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calculator className="text-orange-500" /> Detailed Charge Breakdown
                </h3>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Tax Description</th>
                        <th className="px-6 py-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bill.taxes.map((tax, i) => (
                        <tr key={i} className="text-slate-600 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium">{tax.name}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">Rs {tax.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Charts/Stats */}
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
              <h3 className="text-slate-900 font-bold mb-6 flex items-center gap-2">
                <PieChartIcon size={18} className="text-orange-500" /> Tax Distribution
              </h3>
              <div className="h-64 flex items-center justify-center">
                {bill.taxes && bill.taxes.length > 0 ? (
                  <Pie
                    data={taxData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: 'bottom', labels: { color: '#64748b', font: { size: 10 } } }
                      }
                    }}
                  />
                ) : (
                  <p className="text-slate-400 text-sm">No tax data to visualize.</p>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/20 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-xl text-orange-600">
                  <Wallet size={24} />
                </div>
                <h4 className="font-bold text-slate-900">Savings Mode</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                We found specific areas where your bill seems higher than average. Check the AI suggestions for details.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BillAnalysis;
