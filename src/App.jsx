// App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import NavBar from './Components/NavBar';
import OurServices from './Components/OurServices';
import background5 from './assets/background5.jpg'; // Ensure this import is correct
import HomePage from './Components/HomePage.jsx';
import Books from './Components/Books.jsx'; 
import AuthorDetails from './Components/AuthorDetails'; // Import AuthorDetails component
import BookDetails from './Components/BookDetails'; // Import BookDetails component


const backgroundStyle = {
  backgroundImage: `url(${background5})`, // Use the variable directly without .jpg
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const App = () => {
  return (
    <Router>
      <div style={backgroundStyle}> {/* Apply backgroundStyle here */}
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/homepage" element={<HomePage />} /> {/* HomePage route */}
          <Route path="/books" element={<Books />} /> {/* Books route */}
          <Route path="/author/:authorId" element={<AuthorDetails />} /> {/* AuthorDetails route */}
          <Route path="/book/:editionKey" element={<BookDetails />} />
          {/* BookDetails route */}
        </Routes>
        <OurServices /> {/* OurServices should be on top of the background */}
      </div>
    </Router>
  );
};

export default App;
