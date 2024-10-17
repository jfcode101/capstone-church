import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SermonsPage from "./pages/SermonsPage";
import EventsPage from "./pages/EventsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  console.log("ello");

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/sermons" component={SermonsPage} />
        <Route path="/events" component={EventsPage} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
