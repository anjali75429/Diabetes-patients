import Link from 'next/link';
import React from 'react'

const ArticleList = () => {
    return (
        <div className="homepage-container">
            <h1>Welcome to Diabetes Care Platform</h1>
            <p>Manage your diabetes with recommended food, essential equipment, and helpful articles.</p>

            <div className="buttons">
                <Link href="/articles">View Articles</Link>
                <Link href="/add-artcle">Add an Article</Link>
            </div>
        </div>
    )
}

export default ArticleList;