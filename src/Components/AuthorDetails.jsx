// AuthorDetails.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import background5 from '../assets/background5.jpg'; // Ensure correct path for the background image

function AuthorDetails() {
  const { authorId } = useParams(); // Get authorId from the URL
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAuthorDetails() {
      try {
        const response = await fetch(`https://openlibrary.org/authors/${authorId}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch author details.");
        }
        const data = await response.json();
        setAuthor(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthorDetails();
  }, [authorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="flex flex-col gap-4 p-4 bg-white/20 backdrop-blur-3xl"
      style={{
        backgroundImage: `url(${background5.jpg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div>
        {author ? (
          <div>
            <h1 className="text-3xl font-bold mt-20">{author.name}</h1>

            {/* Display author bio, birth date, death date, and works */}
            <p className="mt-4 text-lg"><strong>Biography:</strong> {author.bio ? (typeof author.bio === 'string' ? author.bio : author.bio.value) : "Biography not available."}</p>
            
            {author.birth_date && <p className="text-lg"><strong>Born:</strong> {author.birth_date}</p>}
            {author.death_date && <p className="text-lg"><strong>Died:</strong> {author.death_date}</p>}

            {/* Display links to the author's works */}
            {author.links && author.links.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Links:</h3>
                <ul className="list-disc ml-6">
                  {author.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Display the author's works if available */}
            {author.works && author.works.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Notable Works:</h3>
                <ul className="list-disc ml-6">
                  {author.works.map((work, index) => (
                    <li key={index}>
                      <a href={`https://openlibrary.org${work.key}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {work.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-4">No works available.</p>
            )}
          </div>
        ) : (
          <p>Author not found.</p>
        )}
      </div>
    </div>
  );
}

export default AuthorDetails;
