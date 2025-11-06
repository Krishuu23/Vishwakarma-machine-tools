import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import Blogs from "../components/Blogs";
import Machines from "../components/Machines";
import Enquiry from "../components/Enquiry";
import Footer from "../components/Footer";
import InquiryModal from "../components/InquiryModal";
import { useState } from "react";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Navbar onInquiryClick={() => setIsModalOpen(true)}/>
      <Hero onInquiryClick={() => setIsModalOpen(true)}/>
      <About />
      <Machines/>
      <Products onInquiryClick={() => setIsModalOpen(true)} />
      <Blogs />
      <Enquiry />
      <Footer />

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default Home;
