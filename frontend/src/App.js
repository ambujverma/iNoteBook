import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';


function App() {
  return (
    <>
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
      </Routes>
      
    </div>
    </Router>
    </>
    
  );
}

export default App;
