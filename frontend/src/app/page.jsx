// app/page.jsx

export default function HomePage() {
  return (
    <div className="homepage-container">
      <h1>Welcome to Diabetes Care Platform</h1>
      <p>Manage your diabetes with recommended food, essential equipment, and helpful articles.</p>
      <div className="buttons">
        <button>View Food List</button>
        <button>View Equipment</button>
        <button>Read Articles</button>
      </div>
    </div>
  );
}
