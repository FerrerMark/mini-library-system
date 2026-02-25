import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import AddBook from './pages/AddBook';
import Register from './pages/Register';
import Mybooks from './pages/MyBooks';
import Contacts from './pages/Contacts';
import About from './pages/About';
import AuthorSearch from './pages/AuthorSearch';
import BookInfo from './pages/BookInfo';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';



const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/" />;
};

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      } catch {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/mybooks"
          element={
            <PrivateRoute>
              <Mybooks />
            </PrivateRoute>
          }
        />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/authors" element={<AuthorSearch />} />
        <Route path="/books/:id" element={<BookInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
