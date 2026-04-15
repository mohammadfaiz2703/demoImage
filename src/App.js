import logo from './logo.svg';
import './App.css';
import Font from './Comp/font';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Comp/login';
import Signup from './Comp/SignUp';
import ImageGallery from './Comp/ImageGallery';

function App() {
  return (
    <>
     <BrowserRouter>
        
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Font/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/imageShowplease" element={<ImageGallery/>} />
      </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;