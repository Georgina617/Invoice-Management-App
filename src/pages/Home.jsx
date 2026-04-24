import React, { useState, useEffect } from 'react';
import invoicesData from '../data/invoice';
import InvoiceItem from '../components/InvoiceItem';
import InvoiceDetails from '../components/InvoiceDetails';
import EmptyEmail from '../assets/empty.svg';
import InvoiceModal from '../components/InvoiceModal';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

function Home({ dark }) {
  const [filter, setFilter] = useState(['all']);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ✅ SAFE LOCALSTORAGE LOAD (VERY IMPORTANT)
  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem('invoices');

      // 👉 if NOTHING in storage → use default data
      if (!saved) return invoicesData;

      const parsed = JSON.parse(saved);

      // 👉 if storage is empty array → keep it empty (don't fallback)
      if (Array.isArray(parsed)) return parsed;

      return invoicesData;
    } catch (error) {
      console.log('LocalStorage error:', error);
      return invoicesData;
    }
  });

  // ✅ SAVE EVERY CHANGE
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  // 🔥 FILTER LOGIC
  const filteredInvoices = filter.includes('all')
    ? invoices
    : invoices.filter((inv) => filter.includes(inv.status));

  const toggleFilter = (status) => {
    if (status === 'all') {
      setFilter(['all']);
      return;
    }

    let updated;

    if (filter.includes(status)) {
      updated = filter.filter((item) => item !== status);
    } else {
      updated = [...filter.filter((f) => f !== 'all'), status];
    }

    if (updated.length === 0) updated = ['all'];

    setFilter(updated);
  };

  // 🔥 DETAILS PAGE
  if (selectedInvoice) {
    return (
      <InvoiceDetails
        invoice={selectedInvoice}
        dark={dark}
        onBack={() => setSelectedInvoice(null)}
        invoices={invoices}
        setInvoices={setInvoices}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-0 mt-[30px] md:mt-0">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 md:mb-12 gap-2 sm:gap-4">
        {/* LEFT */}
        <div>
          <h1
            className={`font-bold ${
              dark ? 'text-white' : 'text-black'
            } text-xl sm:text-2xl md:text-4xl`}
          >
            Invoices
          </h1>

          <p
            className={`mt-1 text-xs sm:text-sm ${
              dark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            There are {filteredInvoices.length} invoices
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {/* FILTER */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-1 sm:gap-2 font-semibold
              text-xs sm:text-sm md:text-base ${
                dark ? 'text-white' : 'text-black'
              }`}
            >
              <span className="sm:hidden">Filter</span>
              <span className="hidden sm:inline">Filter by status</span>

              {open ? (
                <BiChevronUp className="text-purple-500 text-lg" />
              ) : (
                <BiChevronDown className="text-purple-500 text-lg" />
              )}
            </button>

            {open && (
              <div
                className={`absolute right-0 mt-4 p-5 rounded-xl w-52 shadow-xl space-y-3 z-50 ${
                  dark ? 'bg-[#1e2139]' : 'bg-white'
                }`}
              >
                {['all', 'draft', 'pending', 'paid'].map((status) => {
                  const checked = filter.includes(status);

                  return (
                    <div
                      key={status}
                      onClick={() => toggleFilter(status)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center
                        ${
                          checked
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-gray-400 group-hover:border-purple-500'
                        }`}
                      >
                        {checked && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>

                      <span
                        className={`capitalize font-medium ${
                          dark ? 'text-white' : 'text-black'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* NEW INVOICE */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 sm:gap-2 bg-purple-600 text-white
            px-3 sm:px-4 md:px-5 
            py-2 sm:py-3 
            rounded-full hover:bg-purple-500 transition"
          >
            <span
              className="bg-white text-purple-600 rounded-full
              w-6 h-6 sm:w-8 sm:h-8 
              flex items-center justify-center text-sm sm:text-lg"
            >
              +
            </span>

            <span className="text-xs sm:text-sm font-semibold md:hidden">
              New
            </span>

            <span className="hidden md:inline text-sm font-semibold">
              New Invoice
            </span>
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => setSelectedInvoice(invoice)}
              className="cursor-pointer"
            >
              <InvoiceItem invoice={invoice} dark={dark} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 text-center px-4">
            <img
              src={EmptyEmail}
              alt="No invoices"
              className="w-52 md:w-72 mb-8"
            />

            <h2
              className={`text-xl md:text-2xl font-bold mb-3 ${
                dark ? 'text-white' : 'text-black'
              }`}
            >
              There is nothing here
            </h2>

            <p
              className={`max-w-xs text-sm leading-6 ${
                dark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Create an invoice by clicking the{' '}
              <span className="font-semibold">New Invoice</span> button
            </p>
          </div>
        )}
      </div>

      {/* MODAL */}
      <InvoiceModal
        open={showModal}
        setOpen={setShowModal}
        dark={dark}
        invoices={invoices}
        setInvoices={setInvoices}
      />
    </div>
  );
}

export default Home;
