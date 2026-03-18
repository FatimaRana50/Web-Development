import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";

function App() {
  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Home</Link> |
        <Link to="/about"> About</Link> |
        <Link to="/contact"> Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;