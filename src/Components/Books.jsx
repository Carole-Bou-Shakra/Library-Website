/* eslint-disable no-unused-vars */
// YourComponent.jsx
import React, { useEffect, useState } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]); // State to hold book data
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState("Harry Potter"); // Default search query
  const [error, setError] = useState(null); // State for error handling

  // Fetch books based on the searchQuery when the component mounts and whenever searchQuery changes
  useEffect(() => {
    const fetchBooks = async () => {
      const endpoint = `https://openlibrary.org/search.json?q=${searchQuery}`;

      try {
        setLoading(true); // Start loading
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log('API Data:', data); // Log the data from the API
        setBooks(data.docs.slice(0, 12) || []); // Limit to first 10 books
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBooks(); // Trigger fetch when the component mounts
  }, []); // Empty dependency array ensures this runs only on component mount

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state when user types
  };

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Render the book list or empty state
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange} // Update search query when user types
        placeholder="Search for books..."
        className="px-4 py-2 border border-gray-300 rounded-lg mb-4"
      />

      {/* Handle empty state */}
      {books.length === 0 ? (
        <div className="text-gray-500">No books found for {'searchQuery'}.</div>
      ) : (
        // Grid container for books
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-4 mt-4">
          {books.map((book) => (
            <div key={book.title_suggest} className="border p-4 rounded-lg bg-white shadow-md">
              <h3 className="font-bold">{book.title_suggest}</h3>
              <p className="text-gray-600">
                by {book.author_name ? book.author_name.join(', ') : 'Unknown'}
              </p>
              <p className="text-sm text-gray-500">({book.first_publish_year})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
