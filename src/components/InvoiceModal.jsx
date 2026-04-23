import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

function InvoiceModal({ open, setOpen, dark, invoices, setInvoices }) {
  const [form, setForm] = useState({
    senderStreet: '',
    senderCity: '',
    senderPostCode: '',
    senderCountry: '',
    clientName: '',
    clientEmail: '',
    clientStreet: '',
    clientCity: '',
    clientPostCode: '',
    clientCountry: '',
    invoiceDate: '',
    paymentTerms: '30',
    project: '',
  });

  const [items, setItems] = useState([
    { name: '', qty: 1, price: 0, total: 0 },
  ]);

  const [errors, setErrors] = useState({});

  if (!open) return null;

  const formatCurrency = (value) => {
    if (value === '' || value === null || value === undefined) return '';

    return Number(value).toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // 🔥 STYLES
  const inputStyle = (field) => `
    w-full p-3 rounded border outline-none
    ${
      errors[field]
        ? 'border-red-500'
        : dark
          ? 'bg-[#1e2139] border-[#252945] text-white'
          : 'bg-white border-gray-300 text-black'
    }
  `;

  const labelStyle = `text-xs flex justify-between mb-1 ${
    dark ? 'text-gray-400' : 'text-gray-600'
  }`;

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // 🔥 AUTO ADD ITEM ROW
  const autoAddRow = (updated) => {
    const last = updated[updated.length - 1];
    if (last.name && last.qty > 0 && last.price > 0) {
      updated.push({ name: '', qty: 1, price: 0, total: 0 });
    }
  };

  // 🔥 ITEM CHANGE
  const handleItemChange = (index, field, value) => {
    const updated = [...items];

    if (field === 'qty') {
      updated[index].qty = Math.max(1, Number(value));
    } else if (field === 'price') {
      updated[index].price = value; // keep as string
    } else {
      updated[index].name = value;
    }

    const qty = Number(updated[index].qty);
    const price = Number(updated[index].price || 0);

    updated[index].total = Number((qty * price).toFixed(2));

    autoAddRow(updated);
    setItems(updated);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 🔥 VALIDATION (NO ITEM VALIDATION)
  const validate = () => {
    let newErrors = {};

    const requiredFields = [
      'senderStreet',
      'senderCity',
      'senderPostCode',
      'senderCountry',
      'clientName',
      'clientEmail',
      'clientStreet',
      'clientCity',
      'clientPostCode',
      'clientCountry',
      'invoiceDate',
      'project',
    ];

    requiredFields.forEach((field) => {
      if (!form[field]) newErrors[field] = 'REQUIRED';
    });

    if (
      form.clientEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)
    ) {
      newErrors.clientEmail = 'INVALID';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 SUBMIT
  const handleSubmit = (status = 'pending') => {
    if (!validate()) return;

    const validItems = items.filter((item) => item.name);

    // ✅ CALCULATE TOTAL PROPERLY
    const total = validItems.reduce((sum, item) => {
      return sum + Number(item.qty) * Number(item.price);
    }, 0);

    const newInvoice = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      ...form,
      status,
      items: validItems,
      total: Number(total.toFixed(2)), // ✅ NOW THIS WORKS
    };

    // ✅ USE FUNCTIONAL UPDATE (important!)
    setInvoices((prev) => [newInvoice, ...prev]);

    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[900]">
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 md:left-[72px] bg-black/40 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className={`absolute top-0 left-0 md:left-[72px]
        w-full md:w-[650px]
        h-screen overflow-y-auto
        p-6 md:p-10 z-[950]
        ${dark ? 'bg-[#141625]' : 'bg-white'}`}
      >
        <h2
          className={`text-2xl font-bold mb-8 mt-16 md:mt-0 ${dark ? 'text-white' : ''}`}
        >
          New Invoice
        </h2>

        <div className="space-y-8">
          {/* 🔥 BILL FROM */}
          <div>
            <p className="text-purple-500 font-semibold mb-4">Bill From</p>

            <div>
              <label className={labelStyle}>
                Street Address
                {errors.senderStreet && (
                  <span className="text-red-500">REQUIRED</span>
                )}
              </label>
              <input
                name="senderStreet"
                onChange={handleChange}
                className={inputStyle('senderStreet')}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelStyle}>
                  City{' '}
                  {errors.senderCity && (
                    <span className="text-red-500">REQUIRED</span>
                  )}
                </label>
                <input
                  name="senderCity"
                  onChange={handleChange}
                  className={inputStyle('senderCity')}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Post Code{' '}
                  {errors.senderPostCode && (
                    <span className="text-red-500">REQUIRED</span>
                  )}
                </label>
                <input
                  name="senderPostCode"
                  onChange={handleChange}
                  className={inputStyle('senderPostCode')}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Country{' '}
                  {errors.senderCountry && (
                    <span className="text-red-500">REQUIRED</span>
                  )}
                </label>
                <input
                  name="senderCountry"
                  onChange={handleChange}
                  className={inputStyle('senderCountry')}
                />
              </div>
            </div>
          </div>

          {/* 🔥 BILL TO */}
          <div>
            <p className="text-purple-500 font-semibold mb-4">Bill To</p>

            <div className="mt-4">
              <label className={labelStyle}>
                Client’s Name{' '}
                {errors.clientName && (
                  <span className="text-red-500">REQUIRED</span>
                )}
              </label>
              <input
                name="clientName"
                onChange={handleChange}
                className={inputStyle('clientName')}
              />
            </div>

            <div className="mt-4">
              <label className={labelStyle}>
                Client’s Email{' '}
                {errors.clientEmail && (
                  <span className="text-red-500">{errors.clientEmail}</span>
                )}
              </label>
              <input
                name="clientEmail"
                onChange={handleChange}
                className={inputStyle('clientEmail')}
              />
            </div>

            <div className="mt-4">
              <label className={labelStyle}>
                Street Address{' '}
                {errors.clientStreet && (
                  <span className="text-red-500">REQUIRED</span>
                )}
              </label>
              <input
                name="clientStreet"
                onChange={handleChange}
                className={inputStyle('clientStreet')}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className={labelStyle}>
                  City{' '}
                  {errors.clientCity && (
                    <span className="text-red-500">REQUIRED</span>
                  )}
                </label>
                <input
                  name="clientCity"
                  onChange={handleChange}
                  className={inputStyle('clientCity')}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Post Code{' '}
                  {errors.clientPostCode && (
                    <span className="text-red-500">REQUIRED</span>
                  )}
                </label>
                <input
                  name="clientPostCode"
                  onChange={handleChange}
                  className={inputStyle('clientPostCode')}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Country{' '}
                  {errors.clientCountry && (
                    <span className="text-red-500">REQUIRED</span>
                  )}
                </label>
                <input
                  name="clientCountry"
                  onChange={handleChange}
                  className={inputStyle('clientCountry')}
                />
              </div>
            </div>
          </div>

          {/* 🔥 DATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                onChange={handleChange}
                className={inputStyle('invoiceDate')}
              />
            </div>

            <div>
              <label className={labelStyle}>Payment Terms</label>
              <select
                name="paymentTerms"
                onChange={handleChange}
                className={inputStyle()}
              >
                <option value="1">Net 1 Day</option>
                <option value="7">Net 7 Days</option>
                <option value="14">Net 14 Days</option>
                <option value="30">Net 30 Days</option>
              </select>
            </div>
          </div>

          {/* 🔥 PROJECT */}
          <div>
            <label className={labelStyle}>Project Description</label>
            <input
              name="project"
              onChange={handleChange}
              className={inputStyle('project')}
            />
          </div>

          {/* 🔥 ITEM LIST */}
          <div>
            <p className="text-gray-400 font-semibold mb-4 text-lg">
              Item List
            </p>

            <div className="grid grid-cols-5 text-xs text-gray-400 mb-2">
              <span className="col-span-2">Item Name</span>
              <span>Qty.</span>
              <span>Price</span>
              <span>Total</span>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 mb-4">
                <input
                  className={`${inputStyle()} col-span-2`}
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, 'name', e.target.value)
                  }
                />

                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    handleItemChange(index, 'qty', e.target.value)
                  }
                  className={inputStyle()}
                />

                <input
                  type="text"
                  inputMode="decimal"
                  value={item.price}
                  placeholder="0.00"
                  onChange={(e) => {
                    let raw = e.target.value;

                    // remove commas
                    raw = raw.replace(/,/g, '');

                    // allow only numbers + optional decimal (2 places)
                    if (!/^\d*\.?\d{0,2}$/.test(raw)) return;

                    handleItemChange(index, 'price', raw);
                  }}
                  onBlur={(e) => {
                    let raw = e.target.value.replace(/,/g, '');

                    if (raw === '') return;

                    const num = Number(raw);

                    // format only AFTER user finishes typing
                    handleItemChange(index, 'price', num.toFixed(2));
                  }}
                  className={inputStyle()}
                />

                <div className="flex justify-between items-center">
                  <span className={dark ? 'text-gray-300' : 'text-gray-700'}>
                    {item.total.toFixed(2)}
                  </span>
                  {item.name && (
                    <FaTrash
                      onClick={() => deleteItem(index)}
                      className="cursor-pointer text-gray-400 hover:text-red-500"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 FOOTER */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => setOpen(false)}
            className="px-5 py-3 rounded-full bg-gray-200"
          >
            Discard
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => handleSubmit('draft')}
              className="px-5 py-3 rounded-full bg-[#373b53] text-white"
            >
              Save as Draft
            </button>

            <button
              onClick={() => handleSubmit('pending')}
              className="px-5 py-3 rounded-full bg-purple-600 text-white"
            >
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
