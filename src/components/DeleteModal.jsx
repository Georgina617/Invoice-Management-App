import React from 'react';

function DeleteModal({ open, setOpen, onConfirm, invoiceId, dark }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className={`relative z-[1100] w-[90%] max-w-md p-6 rounded-xl shadow-xl ${
          dark ? 'bg-[#1e2139]' : 'bg-white'
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            dark ? 'text-white' : 'text-black'
          }`}
        >
          Confirm Deletion
        </h2>

        <p
          className={`text-sm leading-6 mb-6 ${
            dark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Are you sure you want to delete invoice{' '}
          <span className="font-semibold">#{invoiceId}</span>? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-full bg-gray-300 text-black text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-full bg-red-500 text-white text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
