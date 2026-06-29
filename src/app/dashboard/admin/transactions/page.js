// Transactions Ledger Component
'use client';
import React, { useEffect, useState } from 'react';

export default function TransactionsPage() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔄 এক্সপ্রেস ব্যাকএন্ড থেকে আগের সব ট্রানজেকশন ডেটা লোড করা হচ্ছে
    fetch('http://localhost:5000/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        // যদি ডেটা অ্যারে আকারে আসে তবে সেটে রাখা হচ্ছে
        if (Array.isArray(data)) {
          setTxns(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading transactions:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Transaction ID</th>
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Property</th>
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Parties (T / O)</th>
            <th className="font-bold text-xs uppercase text-slate-500 px-6 py-4">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-slate-400 text-xs">
                Loading transactions...
              </td>
            </tr>
          ) : txns.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-slate-400 text-xs">
                No transactions found. Complete a payment to see it here!
              </td>
            </tr>
          ) : (
            txns.map((t) => (
              <tr key={t._id || t.transactionId}>
                <td className="px-6 py-4 text-xs font-mono font-bold text-slate-600 select-all">
                  {t.transactionId}
                </td>
                <td className="px-6 py-4 font-bold text-slate-800">
                  {t.propertyName}
                </td>
                <td className="px-6 py-4 text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{t.tenantName}</span> → {t.ownerName}
                </td>
                <td className="px-6 py-4 text-sm font-black text-emerald-600">
                  ৳{t.amount}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}