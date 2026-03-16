import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Profile from "./pages/profile";
import PlayMusic from "./pages/playmusic";
import Login from "./pages/login";
import ExploreSongs from "./pages/exploresongs";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exploresongs" element={<ExploreSongs />} />

        {/* ✅ Dynamic route for playing a song */}
        <Route path="/play/:id" element={<PlayMusic />} />

        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
