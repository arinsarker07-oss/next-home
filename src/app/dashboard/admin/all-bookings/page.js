// All Bookings Component
export default function AllBookingsPage({ allBookingData }) {
  // ডাটাবেজের আসল ডাটা (allBookingData) সেট করা হলো, না থাকলে খালি অ্যারে []
  const bookings = allBookingData || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Property</th>
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Tenant Contact</th>
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Paid Amount</th>
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {bookings.map((b) => (
            <tr key={b._id} className="hover:bg-slate-50/40">
              {/* image_32ff5b.png অনুযায়ী propertyName দেখাবে */}
              <td className="px-6 py-4 font-bold text-slate-800 capitalize">
                {b.propertyName}
              </td>
              {/* image_32ff5b.png অনুযায়ী contactNumber দেখাবে */}
              <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                {b.contactNumber}
              </td>
              {/* image_32ff5b.png অনুযায়ী price দেখাবে */}
              <td className="px-6 py-4 text-xs font-bold text-slate-900">
                ৳{b.price}
              </td>
              {/* আপনার রিকোয়েস্ট অনুযায়ী bookingStatus ব্যবহার করা হয়েছে */}
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    b.bookingStatus?.toLowerCase() === "accepted" || b.bookingStatus?.toLowerCase() === "approved"
                      ? "bg-emerald-50 border border-emerald-100 text-emerald-600"
                      : b.bookingStatus?.toLowerCase() === "rejected" || b.bookingStatus?.toLowerCase() === "cancelled"
                      ? "bg-rose-50 border border-rose-100 text-rose-600"
                      : "bg-blue-50 border border-blue-100 text-blue-600"
                  }`}
                >
                  {b.bookingStatus || "pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}