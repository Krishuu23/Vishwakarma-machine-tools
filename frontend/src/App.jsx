import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Blogs from "./components/Blogs";
import Machines from "./components/Machines";
import Enquiry from "./components/Enquiry";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Machines/>
      <Products />
      <Blogs />
      <Enquiry />
      <Footer />
    </>
  );
}

export default App;
