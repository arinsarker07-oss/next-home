"use client";

import { useState } from "react";

// All Users Component
export default function AllUsersPage({ allusers }) {
  const [users, setUsers] = useState(allusers || []);
  const [loadingId, setLoadingId] = useState(null); // কোন ইউজারের রোল আপডেট হচ্ছে তা ট্র্যাক করার জন্য

  const handleRoleChange = async (id, newRole) => {
    setLoadingId(id); // লোডিং শুরু
    
    try {
      // ব্যাকএন্ড এক্সপেস সার্ভারে PATCH রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch(`http://localhost:5000/api/users/${id}/role`, { 
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ব্যাকএন্ডে সফল হলে ফ্রন্টএন্ডের স্টেট আপডেট হবে
        setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
        alert(`Role updated to ${newRole} successfully in backend!`);
      } else {
        alert(data.message || "Failed to update role in database.");
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Something went wrong! Could not connect to backend.");
    } finally {
      setLoadingId(null); // লোডিং শেষ
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Name</th>
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Email</th>
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Current Role</th>
              <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-bold text-slate-800 capitalize">{user.name}</td>
                <td className="px-6 py-4 text-xs text-slate-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    user.role?.toLowerCase() === 'admin' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                    user.role?.toLowerCase() === 'owner' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {loadingId === user._id ? 'Updating...' : (user.role || 'tenant')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={user.role || "tenant"} 
                    disabled={loadingId === user._id} // আপডেট চলাকালীন ড্রপডাউন লক থাকবে
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="text-xs font-semibold bg-white border border-slate-200 rounded-lg p-1.5 focus:outline-none focus:ring-1 focus:ring-slate-950 cursor-pointer disabled:opacity-50"
                  >
                    <option value="tenant">Tenant</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}