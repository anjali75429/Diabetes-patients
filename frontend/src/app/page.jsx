// app/page.jsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="homepage-container">
      <h1>Welcome to Diabetes Care Platform</h1>
      <p>Manage your diabetes with recommended food, essential equipment, and helpful articles.</p>
      <div className="buttons">
        <Link href="/food-list">
          <button>View Food List</button>
        </Link>
        <Link href="/equipment-list">
          <button>View Equipments</button>
        </Link>
        <Link href="/article-list">
        <button>Read Articles</button>
        </Link>
      </div>
    </div>
  );
}
