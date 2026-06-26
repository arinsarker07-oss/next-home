'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiPencilSquare, HiTrash } from 'react-icons/hi2';

export default function MyPropertiesPage({ properties }) {
  console.log(properties, "from my property page ");
  
  const [loading, setLoading] = useState(true);

  // 🔄 ডেটা আসার পর লোডিং বন্ধ করার জন্য useEffect
  useEffect(() => {
    if (properties) {
      setLoading(false);
    }
  }, [properties]);

  // 🛠️ ২. এডিট ফাংশন হ্যান্ডলার
  const handleEditProperty = (propertyId, currentData) => {
    console.log("Editing Property ID:", propertyId);
    console.log("Current Data:", currentData);
    // আপনার PATCH এপিআই বা মডাল লজিক এখানে হবে
  };

  // 🗑️ ৩. ডিলিট ফাংশন হ্যান্ডলার
  const handleDeleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    console.log("Deleting Property ID:", propertyId);
    // আপনার DELETE এপিআই লজিক এখানে হবে
  };

  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-slate-50/50 min-h-screen">
      
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">My Properties</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">Manage and monitor all your listed rental units.</p>
        </div>
      </div>

      {/* ─── pure tailwind css table ─── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* টেবিল হেডার */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80">
                <th className="font-bold text-xs uppercase tracking-wider text-slate-500 px-6 py-4">Title</th>
                <th className="font-bold text-xs uppercase tracking-wider text-slate-500 px-6 py-4">Location</th>
                <th className="font-bold text-xs uppercase tracking-wider text-slate-500 px-6 py-4">Price</th>
                <th className="font-bold text-xs uppercase tracking-wider text-slate-500 px-6 py-4">Type</th>
                <th className="font-bold text-xs uppercase tracking-wider text-slate-500 px-6 py-4">Status</th>
                <th className="font-bold text-xs uppercase tracking-wider text-slate-500 px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            
            {/* টেবিল বডি */}
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-sm text-slate-500 font-medium">
                    Loading properties...
                  </td>
                </tr>
              ) : !properties || properties.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-sm text-slate-500 font-medium">
                    No properties listed yet.
                  </td>
                </tr>
              ) : (
                properties.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/40 transition-colors">
                    
                    {/* টাইটেল এবং প্রোপার্টি ইমেজ */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.images || 'https://i.ibb.co.com/placeholder.png'} 
                          alt={item.title} 
                          width={44}
                          height={44}
                          className="w-11 h-11 object-cover rounded-xl border border-slate-200/60"
                        />
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{item.title}</div>
                          <div className="text-[11px] font-medium text-slate-400 capitalize">{item.rentType || "Monthly"}</div>
                        </div>
                      </div>
                    </td>

                    {/* লোকেশন */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-600">
                      {item.location}
                    </td>

                    {/* প্রাইস */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-slate-900">
                      ৳{Number(item.price).toLocaleString()}
                    </td>

                    {/* প্রোপার্টি টাইপ */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500">
                      {item.propertyType}
                    </td>

                    {/* কাস্টম স্ট্যাটাস ব্যাজ */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === 'Approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                        item.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                        'bg-rose-50 border-rose-100 text-rose-600'
                      }`}>
                        {item.status || 'Pending'}
                      </span>
                    </td>

                    {/* অ্যাকশন বাটনসমূহ */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* এডিট বাটন */}
                        <button
                          onClick={() => handleEditProperty(item._id, item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Property"
                        >
                          <HiPencilSquare className="w-5 h-5" />
                        </button>

                        {/* ডিলিট বাটন */}
                        <button
                          onClick={() => handleDeleteProperty(item._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Property"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}