import React from 'react';

const statusColors = {
  paid: {
    dot: 'bg-green-500',
    lightBg: 'bg-green-100',
    lightText: 'text-green-600',
  },
  pending: {
    dot: 'bg-yellow-500',
    lightBg: 'bg-yellow-100',
    lightText: 'text-yellow-600',
  },
  draft: {
    dot: 'bg-gray-400',
    lightBg: 'bg-gray-200',
    lightText: 'text-gray-600',
  },
};

function InvoiceItem({ invoice, dark }) {
  // 🔥 SAFE STATUS
  const status = statusColors[invoice.status] || statusColors['draft'];

  // 🔥 SAFE DATE (handles mismatch)
  const date = invoice.dueDate || invoice.invoiceDate || '—';

  // 🔥 SAFE TOTAL
  const total = Number(invoice.total) || 0;

  return (
    <div
      className={`flex justify-between items-center rounded-xl cursor-pointer transition
      px-3 py-3 sm:px-5 sm:py-4
      ${
        dark
          ? 'bg-[#1e2139] hover:border hover:border-purple-500'
          : 'bg-white border border-gray-200 hover:border-purple-400'
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-6 min-w-0">
        {/* ID */}
        <p
          className={`font-bold text-xs sm:text-sm md:text-base ${
            dark ? 'text-white' : 'text-black'
          }`}
        >
          <span className="text-gray-400">#</span>
          {invoice.id || '—'}
        </p>

        {/* DATE */}
        <p
          className={`text-[10px] sm:text-sm ${
            dark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {date}
        </p>

        {/* CLIENT */}
        <p
          className={`truncate max-w-[80px] sm:max-w-none text-[10px] sm:text-sm ${
            dark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {invoice.clientName || '—'}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-6">
        {/* AMOUNT */}
        <p
          className={`font-bold text-xs sm:text-sm md:text-base ${
            dark ? 'text-white' : 'text-black'
          }`}
        >
          £{invoice.total?.toFixed(2)}
        </p>

        {/* STATUS */}
        <div
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded 
          w-[80px] sm:w-[110px] justify-center
          ${dark ? 'bg-[#252945]' : status.lightBg}`}
        >
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />

          <span
            className={`capitalize text-[10px] sm:text-sm font-medium ${
              dark ? 'text-white' : status.lightText
            }`}
          >
            {invoice.status || 'draft'}
          </span>
        </div>

        {/* ARROW */}
        <span className="hidden sm:block text-purple-400 text-lg">›</span>
      </div>
    </div>
  );
}

export default InvoiceItem;
