'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { HiPencilSquare, HiTrash, HiHome, HiMapPin, HiCurrencyDollar, HiClock, HiSquare3Stack3D, HiDocumentText, HiPhoto } from 'react-icons/hi2';
import { FaBed, FaBath } from 'react-icons/fa';

export default function MyPropertiesPage({ properties: initialProperties }) {
  // 🔄 প্রপস থেকে আসা ডাটাকে লোকাল স্টেটে রাখা হয়েছে যেন UI আপডেট হয়
  const [properties, setProperties] = useState(initialProperties || []);
  const [loading, setLoading] = useState(true);

  // 🛠️ এডিট মোডাল এবং ফর্মের জন্য নতুন স্টেটসমূহ
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '', location: '', propertyType: 'Apartment', price: '', rentType: 'Monthly',
    bedrooms: '', bathrooms: '', size: '', amenities: '', extraFeatures: '',
    images: '', description: '', ownerName: '', ownerEmail: '', ownerPhone: ''
  });

  // ডেটা আপডেট বা লোড হলে স্টেট সেট করার জন্য
  useEffect(() => {
    if (initialProperties) {
      setProperties(initialProperties);
      setLoading(false);
    }
  }, [initialProperties]);

  // 📝 ইনপুট চেঞ্জ হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 📸 ইমেজ আপলোড হ্যান্ডলার
  const handleImageUpload = async (e) => {
    // ইমেজ আপলোডের লজিক এখানে থাকবে
  };

  // 🛠️ এডিট ফাংশন হ্যান্ডলার
  const handleEditProperty = (propertyId, currentData) => {
    setEditingId(propertyId);
    setFormData({
      title: currentData.title || '',
      location: currentData.location || '',
      propertyType: currentData.propertyType || 'Apartment',
      price: currentData.price || '',
      rentType: currentData.rentType || 'Monthly',
      bedrooms: currentData.bedrooms || '',
      bathrooms: currentData.bathrooms || '',
      size: currentData.size || '',
      amenities: currentData.amenities || '',
      extraFeatures: currentData.extraFeatures || '',
      images: currentData.images || '',
      description: currentData.description || '',
      ownerName: currentData.ownerName || '',
      ownerEmail: currentData.ownerEmail || '',
      ownerPhone: currentData.ownerPhone || ''
    });
    setIsEditModalOpen(true);
  };

  // 💾 এডিট ফর্ম সাবমিট হ্যান্ডলার (PATCH API)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/owner/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.modifiedCount > 0) {
        alert("Property updated successfully!");
        const updatedList = properties.map(item => item._id === editingId ? { ...item, ...formData } : item);
        setProperties(updatedList);
        setIsEditModalOpen(false);
      } else {
        alert("No changes were made.");
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Something went wrong while updating!");
    } finally {
      setIsSaving(false);
    }
  };

  // 🗑️ ডিলিট ফাংশন হ্যান্ডলার
  const handleDeleteProperty = async (propertyId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/owner/${propertyId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.deletedCount > 0) {
        alert("Property deleted successfully!");
        const remaining = properties.filter((item) => item._id !== propertyId);
        setProperties(remaining);
      } else {
        alert("Failed to delete the property.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="p-6 w-full mx-auto space-y-6 bg-slate-50/50 min-h-screen relative">
      
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
                    
                    {/* Title Column + Clean Inline Feedback Box */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.images || 'https://i.ibb.co.com/placeholder.png'} 
                          alt={item.title} 
                          width={44}
                          height={44}
                          className="w-11 h-11 object-cover rounded-xl border border-slate-200/60"
                        />
                        <div className="flex flex-col items-start">
                          <div className="font-bold text-slate-800 text-sm capitalize">{item.title}</div>
                          <div className="text-[11px] font-medium text-slate-400 capitalize mb-1">{item.rentType || "Monthly"}</div>
                          
                          {/* 🌟 টাইটেলের নিচে চমৎকার রিজেকশন নোটিশ */}
                          {item.status?.toLowerCase() === 'rejected' && item.feedback && (
                            <div className="inline-flex text-[11px] text-rose-600 font-medium bg-rose-50/60 border border-rose-100/50 px-2 py-0.5 rounded-md mt-0.5 max-w-[220px] whitespace-normal">
                              <span className="font-bold text-rose-700 mr-1">Reason:</span> {item.feedback}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-600">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-slate-900">
                      ৳{Number(item.price).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500">
                      {item.propertyType}
                    </td>
                    
                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                        item.status === 'Approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                        item.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                        'bg-rose-50 border-rose-100 text-rose-600'
                      }`}>
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleEditProperty(item._id, item)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Property"
                        >
                          <HiPencilSquare className="w-5 h-5" />
                        </button>
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

      {/* ─── 🌟 এডিট পপ-আপ ফর্ম (Modal) ─── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-black text-slate-800">Edit Property Details</h2>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕ Close</button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Property Title</label>
                  <div className="relative flex items-center">
                    <HiHome className="absolute left-3 text-slate-400 text-base" />
                    <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Luxury Apartment" className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Location Address</label>
                  <div className="relative flex items-center">
                    <HiMapPin className="absolute left-3 text-slate-400 text-base" />
                    <input type="text" name="location" required value={formData.location} onChange={handleInputChange} placeholder="Street, City, ZIP" className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Property Type</label>
                  <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors cursor-pointer">
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Rent Price (USD)</label>
                  <div className="relative flex items-center">
                    <HiCurrencyDollar className="absolute left-3 text-slate-400 text-base" />
                    <input type="number" name="price" required value={formData.price} onChange={handleInputChange} placeholder="0.00" className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Rent Cycle</label>
                  <div className="relative flex items-center">
                    <HiClock className="absolute left-3 text-slate-400 text-base pointer-events-none" />
                    <select name="rentType" value={formData.rentType} onChange={handleInputChange} className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors cursor-pointer">
                      <option value="Monthly">Monthly</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Bedrooms</label>
                  <div className="relative flex items-center">
                    <FaBed className="absolute left-3 text-slate-400 text-base" />
                    <input type="number" name="bedrooms" required value={formData.bedrooms} onChange={handleInputChange} placeholder="Beds Count" className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Bathrooms</label>
                  <div className="relative flex items-center">
                    <FaBath className="absolute left-3 text-slate-400 text-sm" />
                    <input type="number" name="bathrooms" required value={formData.bathrooms} onChange={handleInputChange} placeholder="Baths Count" className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Size (Sq. Ft.)</label>
                  <div className="relative flex items-center">
                    <HiSquare3Stack3D className="absolute left-3 text-slate-400 text-base" />
                    <input type="number" name="size" required value={formData.size} onChange={handleInputChange} placeholder="Area Size" className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Amenities</label>
                  <input type="text" name="amenities" required value={formData.amenities} onChange={handleInputChange} placeholder="WiFi, Gym, Pool" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase">Extra Features</label>
                  <input type="text" name="extraFeatures" value={formData.extraFeatures} onChange={handleInputChange} placeholder="24/7 Security, Parking" className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors" />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 uppercase">Property Image Upload</label>
                <div className="flex items-center gap-4 border border-dashed border-slate-200 rounded-lg p-3 bg-slate-50/50">
                  <div className="relative flex items-center bg-white border border-slate-200 rounded-md px-3 py-1.5 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors">
                    <HiPhoto className="text-slate-500 mr-2 text-base" />
                    <span className="text-xs font-bold text-slate-600">Choose Image File</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                  <div className="flex-1 text-right">
                    {!isImageUploading && formData.images && (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-emerald-600 font-bold">✓ Ready</span>
                        <Image width={50} height={50} src={formData.images} alt="Preview" className="w-8 h-8 rounded object-cover border border-slate-200" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <div className="relative flex items-start">
                  <HiDocumentText className="absolute left-3 top-2.5 text-slate-400 text-base" />
                  <textarea name="description" required rows={2} value={formData.description} onChange={handleInputChange} placeholder="Describe details..." className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors resize-none" />
                </div>
              </div>

              <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg space-y-3">
                <span className="block text-xs font-bold text-slate-700 uppercase text-left tracking-wider">Owner Credentials</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input type="text" name="ownerName" readOnly value={formData.ownerName} className="h-9 px-3 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-500 outline-none cursor-not-allowed" />
                  <input type="email" name="ownerEmail" readOnly value={formData.ownerEmail} className="h-9 px-3 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-500 outline-none cursor-not-allowed" />
                  <input type="tel" name="ownerPhone" required value={formData.ownerPhone} onChange={handleInputChange} placeholder="Phone" className="h-9 px-3 bg-white border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-blue-600 transition-colors" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 h-9 border border-slate-200 text-slate-600 font-bold text-xs rounded-lg hover:bg-slate-50 transition-all">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 h-9 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md disabled:opacity-50">
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}