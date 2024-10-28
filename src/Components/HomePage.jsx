// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import { useStore } from "../Components/Store";
import background5 from '../assets/background5.jpg';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Styles.css'; // Ensure this points to the correct CSS file

// Move cache outside the component so it persists across renders
const cache = {};

function Homepage() {
  const { homepageValues, sethomepageValue, searchData, sethomepageData } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const defaultSearch = "Harry Potter";
  const [debouncedValue, setDebouncedValue] = useState(homepageValues || defaultSearch);

  // Debounce effect to avoid excessive API calls while typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(homepageValues || defaultSearch);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler); // Cleanup on value change
    };
  }, [homepageValues]);

  // Fetch books when debouncedValue changes (after debounce)
  useEffect(() => {
    if (debouncedValue) {
      if (cache[debouncedValue]) {
        // Use cached data if available
        sethomepageData(cache[debouncedValue]);
      } else {
        fetchBooks(debouncedValue);
      }
    }
  }, [debouncedValue, sethomepageData]);

  // UseCallback to prevent the function from being re-created on every render
  const fetchBooks = useCallback(async (query) => {
    const endpoint = `https://openlibrary.org/search.json?q=${query}&limit=12`; // Fixed URL format

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log('Data fetched from API:', data.docs);
      
      const books = data.docs.slice(0, 12) || [];
      sethomepageData(books);
      cache[query] = books; // Cache the result for future use
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [sethomepageData]);

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    sethomepageValue(value);
  };

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-white/20 backdrop-blur-3xl my-scroll-container"
      style={{
        backgroundImage: `url(${background5.jpg})`, // Corrected background5 reference
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        overflowY: 'auto', // Ensure it can still scroll vertically
      }}
    >
      <div className="flex items-center gap-2 mt-20 justify-end">
        <input
          onChange={handleInputChange}
          type="text"
          value={homepageValues}
          placeholder="Search for books..."
          className="px-2 py-1 border border-gray-300 w-48 rounded-[10px]"
        />

        <button
          onClick={() => fetchBooks(homepageValues || defaultSearch)} 
          className="bg-[#b84822] text-white py-1 px-4 rounded-[10px]"
        >
          GO!
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {searchData.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchData.map((book) => (
              <div key={book.key} className="border p-4 rounded-lg bg-white shadow-md flex flex-col justify-between">
                {book.cover_i ? (
                  <img
                    loading="lazy" // Lazy load images
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} // Corrected image URL
                    alt={book.title_suggest}
                    className="w-full h-auto mb-2"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-2">
                    <span>No Image Available</span>
                  </div>
                )}
                <h3 className="font-bold">{book.title_suggest}</h3>
                <p className="text-gray-600">
                  by {book.author_name ? book.author_name.join(', ') : 'Unknown'}
                </p>
                <p className="text-sm text-gray-500">({book.first_publish_year})</p>

                <div className="flex w-full mt-4 rounded-[40px]">
                  <Link to={`/author/${book.author_key[0]}`} className="bg-[#95683f] text-white px-4 py-1 rounded-[20px] text-center flex-1 mr-2">
                    Author Details
                  </Link>
                  <Link to={`/book/${book.key.split('/').pop()}`} className="bg-[#b84822] text-white px-4 py-1 rounded-[20px] text-center flex-1">
                    Book Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
