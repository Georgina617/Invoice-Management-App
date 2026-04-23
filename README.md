🚀 Invoice App

A modern invoice management app built with React. Create, manage, and track invoices with a clean UI, dark mode support, and persistent data storage.

✨ Features
📄 Create new invoices (Save as Draft or Send)
🗂 Filter invoices by status (Draft, Pending, Paid)
💾 Persistent data using localStorage
✏️ Edit existing invoices
🗑 Delete invoices with confirmation modal
✅ Mark invoices as paid (without leaving details page)
🌙 Fully responsive dark/light mode UI
📱 Mobile-friendly design

🛠️ Tech Stack
React
Tailwind CSS
LocalStorage (for persistence)
React Icons
📦 Installation

Clone the repo and install dependencies:

git clone https://github.com/your-username/invoice-app.git
cd invoice-app
npm install
npm run dev
🧠 How It Works
Invoices are stored in React state
Data is synced to localStorage automatically
On page load, invoices are restored from localStorage
UI updates instantly using React state updates
📁 Project Structure
src/
 ├── components/
 │   ├── InvoiceItem.jsx
 │   ├── InvoiceDetails.jsx
 │   ├── InvoiceModal.jsx
 │   ├── EditInvoiceModal.jsx
 │   ├── DeleteModal.jsx
 │
 ├── pages/
 │   └── Home.jsx
 │
 ├── data/
 │   └── invoice.js
🔥 Key Improvements (Recent Updates)
Fixed invoice creation bug
Added localStorage persistence
Implemented delete confirmation modal
Improved dark mode styling
Fixed status updates without navigation
Improved mobile spacing and layout
🎯 Future Improvements
Backend integration (Firebase / Node.js)
Authentication (login system)
Export invoices as PDF
Search functionality
Pagination
🙌 Acknowledgements

Design inspired by modern invoice dashboard UIs.

📌 Author

Georgina Odusanya

⭐️ Support

If you like this project, give it a ⭐️ on GitHub!
