import Image from 'next/image';
import React from 'react';

const BookingRequestPage = ({ ownerProperty, BookingData }) => {
    // ১. ওনারের প্রপার্টিগুলোর আইডি দিয়ে একটি অ্যারে তৈরি করা
    const ownerPropertyIds = ownerProperty ? ownerProperty.map(prop => prop._id) : [];

    // ২. বুকিং ডেটা থেকে শুধু ওনারের প্রপার্টির বুকিংগুলো ফিল্টার করা
    const myBookingRequests = BookingData
        ? BookingData.filter(booking => ownerPropertyIds.includes(booking.propertyId))
        : [];

    return (
        <div className="p-6  w-full bg-gray-50 min-h-screen">
            <div className=" mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-white">
                    <h2 className="text-xl font-bold text-gray-800">Booking Requests</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage and review incoming booking requests for your properties</p>
                </div>

                {myBookingRequests.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500 text-lg">No booking requests found for your properties.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Move-in Date & Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {myBookingRequests.map((booking) => (
                                    <tr key={booking._id} className="hover:bg-gray-50/75 transition-colors">
                                        {/* Property Column with Image */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    width={48}
                                                    height={48}
                                                    src={booking.propertyImage || "https://placehold.co/600x400"}
                                                    alt={booking.propertyName || "Property Image"}
                                                    className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                                                />
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-sm max-w-[180px] truncate">
                                                        {booking.propertyName || "Unnamed Property"}
                                                    </div>
                                                    <div className="text-xs text-gray-400 truncate max-w-[180px]">
                                                        {booking.propertyLocation}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Tenant Info Column */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-800">{booking.tenantName}</div>
                                            <div className="text-xs text-gray-500">{booking.tenantEmail}</div>
                                        </td>

                                        {/* Move-in Date & Contact */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-700 font-medium">
                                                {booking.moveInDate ? new Date(booking.moveInDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A"}
                                            </div>
                                            <div className="text-xs text-gray-500">{booking.contactNumber}</div>
                                        </td>

                                        {/* Price Column */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            ৳{booking.price}
                                        </td>

                                        {/* Dynamic Payment Status Badge */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${booking.paymentStatus === 'paid'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${booking.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                                {booking.paymentStatus ? booking.paymentStatus.toUpperCase() : 'PENDING'}
                                            </span>
                                        </td>

                                        {/* Action Buttons */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                                                    Accept
                                                </button>
                                                <button className="px-3 py-1.5 text-xs font-medium text-white bg-red-400 hover:bg-red-600 rounded-md transition-colors">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingRequestPage;