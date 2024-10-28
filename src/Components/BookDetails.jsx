// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import background5 from '../assets/background5.jpg'; // Adjust the path to your image

function BookDetails() {
  const { editionKey } = useParams(); // Extract editionKey from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await fetch(`https://openlibrary.org/works/${editionKey}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch book details.");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [editionKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className={`flex flex-col gap-4 p-4 bg-white/20 backdrop-blur-3xl `}
      style={{
        backgroundImage: `url(${background5.jpg})`, // Use the imported image directly
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {book ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mt-20">{book.title || "Title not available"}</h1>
          {/* Display the book cover image if available */}
          {book.cover_id ? (
  <img
    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`} // Use the cover_id to get the image
    alt={book.title}
    className="mt-4 mb-4 w-48 h-auto" // Adjust the width and height as needed
  />
) : (
  <p>No cover image available.</p> // Fallback message
)}

          <p>{book.description?.value || "Description not available."}</p>
          {/* Other rendering logic */}
        </div>
      ) : (
        <p>Book not found.</p>
      )}
    </div>
  );
}

export default BookDetails;
