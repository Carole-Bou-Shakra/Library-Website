/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useStore } from "../Components/Store"; // Assuming useStore is already set up

function SearchComponent() {
  const { homepageValues, setHomepageValue, homepageData, setHomepageData } = useStore();
  const [debouncedValue, setDebouncedValue] = useState(homepageValues);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(homepageValues);
    }, 300); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler); // Cleanup the timeout on unmount or value change
    };
  }, [homepageValues]);

  // Fetch books when the debounced search value changes
  useEffect(() => {
    if (debouncedValue.length > 0) { // Only fetch if there is a query
      fetchBooks(debouncedValue);
    } else {
      setHomepageData([]); // Clear results if input is empty
    }
  }, [debouncedValue]); // Effect runs when debouncedValue changes

  function fetchBooks(query) {
    const endpoint = `https://openlibrary.org/search.json?q=${query}&mode=metric`;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data fetched:', data);
        setHomepageData(data.docs.slice(0, 10) || []); // Update the global state with fetched data (limit to 10)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    console.log("Fetching data started...");
  }

  return (
    <div className="relative flex flex-col items-end"> {/* Add relative positioning */}
      <div className="flex items-center gap-2 mt-20 justify-end">
        <input
          onChange={(event) => setHomepageValue(event.target.value)} // Update state on input change
          type="text"
          className="px-2 py-1 border border-gray-300 w-48 rounded-[10px]"
          placeholder="Search for books..."
          value={homepageValues}
        />
        <button 
          onClick={() => fetchBooks(debouncedValue)} 
          className="bg-[#b84822] text-white py-1 px-4 rounded-[10px]"
        >
          GO!
        </button>
      </div>

      {/* Displaying the fetched books in a dropdown */}
      {homepageData.length > 0 && (
        <div className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-48 z-10 mt-1"> {/* Added mt-1 for spacing */}
          {homepageData.map((book) => (
            <div key={book.key} className="p-2 hover:bg-gray-200 cursor-pointer">
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
}

export default SearchComponent;
