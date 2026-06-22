'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; // আপনার Better-Auth ক্লায়েন্ট পাথ
import {
  HiHome, HiDocumentText, HiMapPin, HiCurrencyDollar,
  HiClock, HiSquare3Stack3D, HiPhoto
} from "react-icons/hi2";
import { FaBed, FaBath } from "react-icons/fa";
import { AddProperty } from "@/lib/action/allProperty";

export default function AddPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // 👉 Better-Auth সেশন হুক থেকে কারেন্ট ওনারের ডেটা নেওয়া হচ্ছে
  const { data: session } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    propertyType: "Apartment",
    price: "",
    rentType: "Monthly",
    bedrooms: "",
    bathrooms: "",
    size: "",
    amenities: "",
    images: "",
    extraFeatures: "",
    status: "Pending",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: ""
  });

  // সেশন লোড হওয়ার সাথে সাথে ওনারের নাম ও ইমেইল স্টেট-এ সেট করে দেওয়া
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        ownerName: session.user.name || "",
        ownerEmail: session.user.email || ""
      }));
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsImageUploading(true);

    const imgData = new FormData();
    imgData.append("image", file);

    try {
      const IMGBB_API_KEY = "38fb8a923c25fe824ec98aca7500824d";

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: imgData,
      });

      const result = await response.json();

      if (result.success) {
        const uploadedUrl = result.data.url;
        console.log("ImgBB Upload Success! URL:", uploadedUrl);


        setFormData((prev) => ({ ...prev, images: uploadedUrl }));
      } else {
        alert("Image upload failed to ImgBB framework.");
      }
    } catch (error) {
      console.error("ImgBB Connection Error:", error);
      alert("Error uploading image. Check console.");
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.images) {
      alert("Please wait until the property image is fully hosted on ImgBB.");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Ready to push payload to backend DB:", formData);

      const payload = await AddProperty(formData)
      e.target.reset()
      setFormData({
        title: "",
        description: "",
        location: "",
        propertyType: "Apartment",
        price: "",
        rentType: "Monthly",
        bedrooms: "",
        bathrooms: "",
        size: "",
        amenities: "",
        images: "",
        extraFeatures: "",
        status: "Pending",
        ownerName: "",
        ownerEmail: "",
        ownerPhone: ""
      })
      setIsLoading(false);
      alert("Property added successfully!");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full  bg-slate-50 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl border border-slate-100 overflow-hidden">

        {/* Compact Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Add New Property</h2>
            <p className="text-xs text-blue-100">Fill in the fields to list your property asset.</p>
          </div>
          <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wide">
            Status: {formData.status}
          </span>
        </div>

        {/* Optimized Form Grid */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-5">

          {/* Row 1: Title & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Property Title</label>
              <div className="relative flex items-center">
                <HiHome className="absolute left-3 text-slate-400 text-base" />
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Luxury Apartment"
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Location Address</label>
              <div className="relative flex items-center">
                <HiMapPin className="absolute left-3 text-slate-400 text-base" />
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Street, City, ZIP"
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Property Type, Rent Price & Cycle */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors cursor-pointer"
              >
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
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Rent Cycle</label>
              <div className="relative flex items-center">
                <HiClock className="absolute left-3 text-slate-400 text-base pointer-events-none" />
                <select
                  name="rentType"
                  value={formData.rentType}
                  onChange={handleInputChange}
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors cursor-pointer"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Daily">Daily</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 3: Specs - Beds, Baths & Size */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Bedrooms</label>
              <div className="relative flex items-center">
                <FaBed className="absolute left-3 text-slate-400 text-base" />
                <input
                  type="number"
                  name="bedrooms"
                  required
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="Beds Count"
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Bathrooms</label>
              <div className="relative flex items-center">
                <FaBath className="absolute left-3 text-slate-400 text-sm" />
                <input
                  type="number"
                  name="bathrooms"
                  required
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="Baths Count"
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Size (Sq. Ft.)</label>
              <div className="relative flex items-center">
                <HiSquare3Stack3D className="absolute left-3 text-slate-400 text-base" />
                <input
                  type="number"
                  name="size"
                  required
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="Area Size"
                  className="w-full h-10 pl-9 pr-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Amenities & Extra Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Amenities</label>
              <input
                type="text"
                name="amenities"
                required
                value={formData.amenities}
                onChange={handleInputChange}
                placeholder="WiFi, Gym, Pool (Comma separated)"
                className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-bold text-slate-500 uppercase">Extra Features</label>
              <input
                type="text"
                name="extraFeatures"
                value={formData.extraFeatures}
                onChange={handleInputChange}
                placeholder="24/7 Security, Parking"
                className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* 👉 [Updated Row 5]: REAL FILE UPLOAD FOR IMGBB CONVERSION */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase">Property Image Upload</label>
            <div className="flex items-center gap-4 border border-dashed border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-md px-3 py-1.5 cursor-pointer shadow-sm hover:bg-slate-50 transition-colors">
                <HiPhoto className="text-slate-500 mr-2 text-base" />
                <span className="text-xs font-bold text-slate-600">Choose Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  required={!formData.images}
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>


              <div className="flex-1 text-right">
                {isImageUploading && (
                  <span className="text-xs font-semibold text-blue-600 animate-pulse">Uploading to ImgBB framework...</span>
                )}
                {!isImageUploading && formData.images && (
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-xs text-emerald-600 font-bold">✓ Ready</span>
                    <img src={formData.images} alt="Preview" className="w-8 h-8 rounded object-cover border border-slate-200" />
                  </div>
                )}
                {!isImageUploading && !formData.images && (
                  <span className="text-xs text-slate-400">No file uploaded yet</span>
                )}
              </div>
            </div>
          </div>

          {/* Row 6: Description */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <div className="relative flex items-start">
              <HiDocumentText className="absolute left-3 top-2.5 text-slate-400 text-base" />
              <textarea
                name="description"
                required
                rows={2}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe details regarding nearby infrastructure, facilities..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-600 transition-colors resize-none"
              />
            </div>
          </div>

          {/* 👉 [Updated Row 7]: Session Protected Owner Contact Matrix */}
          <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-lg space-y-3">
            <span className="block text-xs font-bold text-slate-700 uppercase text-left tracking-wider">Owner Credentials (Auto-Populated)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                name="ownerName"
                readOnly
                value={formData.ownerName}
                placeholder="Loading Name..."
                className="h-9 px-3 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-500 outline-none cursor-not-allowed"
              />
              <input
                type="email"
                name="ownerEmail"
                readOnly
                value={formData.ownerEmail}
                placeholder="Loading Email..."
                className="h-9 px-3 bg-slate-100 border border-slate-200 rounded-md text-xs font-medium text-slate-500 outline-none cursor-not-allowed"
              />
              <input
                type="tel"
                name="ownerPhone"
                required
                value={formData.ownerPhone}
                onChange={handleInputChange}
                placeholder="Contact Phone Number"
                className="h-9 px-3 bg-white border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* Footer Control Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 h-9 border border-slate-200 text-slate-600 font-bold text-xs rounded-lg hover:bg-slate-50 transition-all transform active:scale-95"
            >
              Cancel
            </button>
            <Button
              type="submit"
              color="primary"
              className="px-6 h-9 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md rounded-lg transition-all transform active:scale-95"
              isLoading={isLoading || isImageUploading}
              disabled={isImageUploading}
            >
              Deploy Listing
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}