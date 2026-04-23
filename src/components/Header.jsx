export default function Header() {
  return (
    <div className="header">
      <div>
        <h1>Invoices</h1>
        <p>There are 7 total invoices</p>
      </div>

      <div className="header-actions">
        <button className="filter-btn">Filter by status ▼</button>

        <button className="new-btn">
          <span className="plus">+</span>
          New Invoice
        </button>
      </div>
    </div>
  );
}
