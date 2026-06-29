"use client"; // Next.js App Router-এ useState ব্যবহারের জন্য এটি নিশ্চিত করুন

import { useState } from "react";
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";

// All Properties Component (With Challenge Rejection Modal)
export default function AllPropertiesPage({ allproperty }) {
  const [properties, setProperties] = useState(allproperty || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loadingId, setLoadingId] = useState(null); // লোডিং স্টেট ট্র্যাকিংয়ের জন্য

  // ব্যাকএন্ডে স্ট্যাটাস আপডেট করার ফাংশন
  const updateStatus = async (id, status, msg = '') => {
    setLoadingId(id); // রিকোয়েস্ট চলাকালীন বাটনটি ডিজেবল করার জন্য
    
    try {
      // আপনার ব্যাকএন্ড API এন্ডপয়েন্ট অনুযায়ী URL পরিবর্তন করুন (যেমন: /api/properties/${id})
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, feedback: msg }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // ব্যাকএন্ডে সফলভাবে আপডেট হলে ফ্রন্টএন্ড স্টেট আপডেট হবে
      setProperties(properties.map(p => p._id === id ? { ...p, status, feedback: msg } : p));
      
    } catch (error) {
      console.error("Error updating status:", error);
      alert("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Title</th>
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Price</th>
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Status</th>
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {properties.map(p => (
              <tr key={p._id} className="hover:bg-slate-50/40">
                <td className="px-6 py-4 font-bold text-slate-800 capitalize">{p.title}</td>
                <td className="px-6 py-4 text-xs font-semibold">৳{p.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    p.status?.toLowerCase() === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                    p.status?.toLowerCase() === 'rejected' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  }`}>{p.status || 'Pending'}</span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button 
                    disabled={loadingId === p._id}
                    onClick={() => updateStatus(p._id, 'Approved')} 
                    className="bg-emerald-600 cursor-pointer disabled:opacity-50 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
                  >
                    {loadingId === p._id ? 'Validating...' : 'Approve'}
                  </button>
                  <button 
                    disabled={loadingId === p._id}
                    onClick={() => { setSelectedId(p._id); setIsModalOpen(true); }} 
                    className="bg-rose-600 cursor-pointer disabled:opacity-50 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-700 transition-all shadow-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rejection Modal Component */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 max-w-sm w-full shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600">
              <HiChatBubbleLeftEllipsis className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-wider">Rejection Feedback</h3>
            </div>
            <textarea 
              rows="4" value={feedback} onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback for the owner..."
              className="w-full text-xs font-medium border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button 
                onClick={() => { updateStatus(selectedId, 'Rejected', feedback); setIsModalOpen(false); setFeedback(''); }} 
                className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}