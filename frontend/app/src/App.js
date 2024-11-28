import logo from './logo.svg';
import './App.css';
import Login from "./pages/login"
import Home from './pages/home';
import Header from './components/header';
import Signup from './pages/signup';
import { Route,Routes } from 'react-router-dom';
function App() {
  
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
    
  );
}

export default App;
