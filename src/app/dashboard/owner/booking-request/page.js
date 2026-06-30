'use client'; // Required if you are using Next.js App Router
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const BookingRequestPage = ({ ownerProperty, BookingData }) => {
    console.log(BookingData, "yooo");

    // 1. Create an array of property IDs belonging to the owner
    const ownerPropertyIds = ownerProperty ? ownerProperty.map(prop => prop._id) : [];

    // 2. Filter the booking data to get only the requests for the owner's properties
    const initialBookings = BookingData
        ? BookingData.filter(booking => ownerPropertyIds.includes(booking.propertyId))
        : [];

    // State to manage filtered booking requests reactively
    const [myBookingRequests, setMyBookingRequests] = useState(initialBookings);

    // Synchronize local state if the parent props (BookingData or ownerProperty) change
    useEffect(() => {
        if (BookingData) {
            setMyBookingRequests(BookingData.filter(booking => ownerPropertyIds.includes(booking.propertyId)));
        }
    }, [BookingData, ownerProperty]);

    // 3. Function to update booking status (Accept/Reject) via API call
    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            // Replace with your exact backend API URL (e.g., /api/bookings/${bookingId})
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingStatus: newStatus }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update frontend state instantly without reloading the page on success
                setMyBookingRequests(prevRequests =>
                    prevRequests.map(booking =>
                        booking._id === bookingId ? { ...booking, bookingStatus: newStatus } : booking
                    )
                );
                alert(`Booking status marked as ${newStatus}!`);
            } else {
                alert(data.message || "Failed to update booking status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className=" w-full  bg-gray-50 min-h-screen">
            <div className="mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                        <table className="w-full  text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Move-in Date & Contact</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {myBookingRequests.map((booking) => {
                                    // Normalize status string to lowercase to avoid potential database case-sensitivity issues
                                    const currentStatus = booking.bookingStatus ? booking.bookingStatus.toLowerCase() : 'pending';

                                    return (
                                        <tr key={booking._id} className="hover:bg-gray-50/75 transition-colors">
                                            {/* Property Column */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <Image
                                                        width={48}
                                                        height={48}
                                                        src={booking.propertyImage || "https://placehold.co/600x400"}
                                                        alt={booking.propertyName || "Property Image"}
                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                                                    />
                                                    {/* flex-col ensures Name and Location stay vertically stacked without overflowing */}
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-semibold text-gray-900 text-sm max-w-[180px] truncate block">
                                                            {booking.propertyName || "Unnamed Property"}
                                                        </span>
                                                        <span className="text-xs text-gray-400 truncate max-w-[180px] block mt-0.5">
                                                            {booking.propertyLocation || "No Location"}
                                                        </span>
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

                                            {/* Payment Status Badge */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${booking.paymentStatus === 'paid'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${booking.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                                                    {booking.paymentStatus ? booking.paymentStatus.toUpperCase() : 'PENDING'}
                                                </span>
                                            </td>

                                            {/* Booking Status Badge */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${currentStatus === 'accepted' ? 'bg-green-100 text-green-700' :
                                                    currentStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {currentStatus}
                                                </span>
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Show Action buttons only if the current booking status is pending */}
                                                    {currentStatus === 'pending' ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                                                                className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                                                className="px-3 py-1.5 text-xs font-medium text-white bg-red-400 hover:bg-red-600 rounded-md transition-colors cursor-pointer"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    ) : (
                                                        // Fallback text when an action has already been taken (accepted or rejected)
                                                        <span className="text-xs text-gray-400 italic font-normal">Action taken</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingRequestPage;