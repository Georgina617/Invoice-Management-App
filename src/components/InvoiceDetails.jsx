import React, { useState } from 'react';
import EditInvoiceModal from './EditInvoiceModal';
import DeleteModal from './DeleteModal';

function InvoiceDetails({ invoice, onBack, dark, invoices, setInvoices }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // 🔥 ALWAYS GET LATEST VERSION FROM STATE (fixes stale data)
  const currentInvoice = invoices.find((inv) => inv.id === invoice?.id);

  if (!currentInvoice) return null;

  const textMain = dark ? 'text-white' : 'text-black';
  const textSub = 'text-gray-400';

  // 🔥 DELETE
  const confirmDelete = () => {
    const updated = invoices.filter((inv) => inv.id !== currentInvoice.id);
    setInvoices(updated);
    setShowDelete(false);
    onBack(); // go home AFTER confirm
  };

  // 🔥 MARK AS PAID (NO NAVIGATION)
  const handleMarkAsPaid = () => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === currentInvoice.id ? { ...inv, status: 'paid' } : inv,
      ),
    );
  };

  // 🔥 SAFE ITEMS
  const items = currentInvoice.items || [];

  // 🔥 TOTAL
  const total =
    items.reduce((sum, item) => sum + Number(item.total || 0), 0) || 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 🔙 GO BACK */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm text-gray-400"
      >
        ← Go back
      </button>

      {/* 🔥 STATUS BAR */}
      <div
        className={`flex justify-between items-center p-5 rounded-xl mb-6 ${
          dark ? 'bg-[#1e2139]' : 'bg-white'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className={textSub}>Status</span>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold
            ${
              currentInvoice.status === 'paid'
                ? 'bg-green-900 text-green-400'
                : currentInvoice.status === 'pending'
                  ? 'bg-yellow-900 text-yellow-400'
                  : 'bg-gray-700 text-gray-300'
            }`}
          >
            ● {currentInvoice.status}
          </span>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowEdit(true)}
            className="bg-gray-200 text-black px-4 py-2 rounded-full text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => setShowDelete(true)} // ✅ OPEN MODAL
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
          >
            Delete
          </button>

          {currentInvoice.status !== 'paid' && (
            <button
              onClick={handleMarkAsPaid}
              className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* 🔥 MAIN CARD */}
      <div className={`p-8 rounded-xl ${dark ? 'bg-[#1e2139]' : 'bg-white'}`}>
        {/* TOP */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className={`font-bold ${textMain}`}>
              <span className="text-gray-400">#</span>
              {currentInvoice.id}
            </h2>
            <p className={textSub}>{currentInvoice.project}</p>
          </div>

          <div className={`text-right text-sm ${textSub}`}>
            <p>{currentInvoice.senderStreet}</p>
            <p>{currentInvoice.senderCity}</p>
            <p>{currentInvoice.senderPostCode}</p>
            <p>{currentInvoice.senderCountry}</p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* DATE */}
          <div>
            <p className={textSub}>Invoice Date</p>
            <p className={textMain}>{currentInvoice.invoiceDate}</p>

            <p className={`${textSub} mt-4`}>Payment Due</p>
            <p className={textMain}>{currentInvoice.invoiceDate}</p>
          </div>

          {/* BILL TO */}
          <div>
            <p className={textSub}>Bill To</p>
            <p className={`${textMain} font-semibold`}>
              {currentInvoice.clientName}
            </p>
            <p className={textSub}>{currentInvoice.clientStreet}</p>
            <p className={textSub}>{currentInvoice.clientCity}</p>
            <p className={textSub}>{currentInvoice.clientPostCode}</p>
            <p className={textSub}>{currentInvoice.clientCountry}</p>
          </div>

          {/* EMAIL */}
          <div>
            <p className={textSub}>Sent to</p>
            <p className={textMain}>{currentInvoice.clientEmail}</p>
          </div>
        </div>

        {/* 🔥 ITEM TABLE */}
        <div className="rounded-xl overflow-hidden">
          {/* HEADER */}
          <div className="grid grid-cols-4 p-5 bg-[#252945] text-gray-400 text-sm">
            <span>Item Name</span>
            <span className="text-center">QTY.</span>
            <span className="text-center">Price</span>
            <span className="text-right">Total</span>
          </div>

          {/* ITEMS */}
          <div className="bg-[#1e2139]">
            {items.map((item, i) => (
              <div key={i} className="grid grid-cols-4 p-5 text-white text-sm">
                <span>{item.name}</span>
                <span className="text-center">{item.qty}</span>
                <span className="text-center">
                  £ {Number(item.price || 0).toFixed(2)}
                </span>
                <span className="text-right">
                  £ {Number(item.total || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="flex justify-between items-center p-6 bg-black text-white">
            <span>Amount Due</span>
            <span className="text-xl font-bold">£ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* ✅ EDIT MODAL */}
      <EditInvoiceModal
        open={showEdit}
        setOpen={setShowEdit}
        dark={dark}
        invoice={currentInvoice} // 🔥 IMPORTANT FIX
        invoices={invoices}
        setInvoices={setInvoices}
      />
      <DeleteModal
        open={showDelete}
        setOpen={setShowDelete}
        onConfirm={confirmDelete}
        invoiceId={currentInvoice.id}
        dark={dark}
      />
    </div>
  );
}

export default InvoiceDetails;
