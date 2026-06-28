
// Transactions Ledger Component
export default  function TransactionsPage() {
  const txns = [
    { id: 'txn_9S82K1LL', title: 'Premium Suite Room', tenant: 'Asif Khan', owner: 'M. R. Rahman', amount: 30000, date: '2026-06-25' }
  ];
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
          {txns.map(t => (
            <tr key={t.id}>
              <td className="px-6 py-4 text-xs font-mono font-bold text-slate-600 select-all">{t.id}</td>
              <td className="px-6 py-4 font-bold text-slate-800">{t.title}</td>
              <td className="px-6 py-4 text-xs text-slate-600">
                <span className="font-bold text-slate-800">{t.tenant}</span> → {t.owner}
              </td>
              <td className="px-6 py-4 text-sm font-black text-emerald-600">৳{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}