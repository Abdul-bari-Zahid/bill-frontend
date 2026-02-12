import { useState } from "react";
import toast from "react-hot-toast";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("auth/register", form, { withCredentials: true });
      toast.success("Account created! ✅");

      localStorage.setItem("token", res.data.token);

      setTimeout(() => navigate("/dashboard"), 800);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Register failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl border border-orange-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 p-0.5 mb-4 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="text-orange-600 font-black text-2xl">S</span>
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">SmartBill</h2>
          <p className="text-slate-500 font-medium mt-1">Join the savings revolution</p>
        </div>
        <p className="text-center text-sm text-slate-500 mb-8 font-medium">
          Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Sign In</Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              type="text" placeholder="John Doe"
              className="w-full mt-1.5 p-4 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 bg-slate-50 focus:bg-white transition-all" required />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email address</label>
            <input name="email" value={form.email} onChange={handleChange}
              type="email" placeholder="you@example.com"
              className="w-full mt-1.5 p-4 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 bg-slate-50 focus:bg-white transition-all" required />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input name="password" value={form.password} onChange={handleChange}
              type="password" placeholder="Create password"
              className="w-full mt-1.5 p-4 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 bg-slate-50 focus:bg-white transition-all" required />
          </div>

          <button type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-500/30 active:scale-95 mt-4">
            Create Free Account
          </button>
        </form>
      </div>
    </div>
  );
}
