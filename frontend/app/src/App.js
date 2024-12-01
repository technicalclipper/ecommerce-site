import logo from './logo.svg';
import './App.css';
import Login from "./pages/login"
import Home from './pages/home';
import Header from './components/header';
import Signup from './pages/signup';
import Products from './pages/products';
import Cart from './pages/cart';
import { Route,Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';

function App() {
  
  return (
    <>
      <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </AuthProvider> 
    </>
    
  );
}

export default App;
