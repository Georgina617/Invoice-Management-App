🚀 Invoice App

A modern invoice management app built with React.
Create, manage, and track invoices with a clean interface, dark mode support, and persistent storage.

✨ Features
Create invoices (save as draft or send)
Filter by status: Draft, Pending, Paid
Edit existing invoices
Delete invoices with confirmation
Mark invoices as paid directly
Persistent data with localStorage
Responsive design with dark/light mode
🛠️ Tech Stack
React
Tailwind CSS
LocalStorage
React Icons
📦 Installation

Clone the repository and install dependencies:

git clone https://github.com/your-username/invoice-app.git
cd invoice-app
npm install
npm run dev
🧠 How It Works
Invoices are stored in React state
Data syncs automatically to localStorage
On reload, saved invoices are restored
UI updates instantly through state changes
📁 Project Structure
src/
 ├── components/
 │   ├── InvoiceItem.jsx
 │   ├── InvoiceDetails.jsx
 │   ├── InvoiceModal.jsx
 │   ├── EditInvoiceModal.jsx
 │   └── DeleteModal.jsx
 │
 ├── pages/
 │   └── Home.jsx
 │
 └── data/
     └── invoice.js
🔥 Recent Improvements
Fixed invoice creation bug
Added localStorage persistence
Added delete confirmation modal
Improved dark mode styling
Fixed status updates without navigation
Improved mobile layout and spacing
🎯 Future Improvements
Backend integration (Firebase or Node.js)
Authentication system
Export invoices as PDF
Search functionality
Pagination
🙌 Acknowledgements

Inspired by modern invoice dashboard designs.

📌 Author

Georgina Odusanya

⭐ Support

If you like this project, consider giving it a star on GitHub ⭐️
