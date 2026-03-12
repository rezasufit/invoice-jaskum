import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Homepage from '../HomePage2/HomePage2'
import AboutPage from '../AboutPage/AboutPage'
import ContactPage from '../ContactPage/ContactPage'
import ServicePageS2 from '../ServicePageS2/ServicePageS2';
import ServiceSinglePage from '../ServiceSinglePage/ServiceSinglePage'
import TestimonialPage from '../TestimonialPage/TestimonialPage';

import InvoiceGenerating from '../../components/Invoice/InvoiceGenerator.jsx'

const AllRoute = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/home' element={<Homepage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/service-s2' element={<ServicePageS2 />} />
          <Route path='/service-single/:id' element={<ServiceSinglePage />} />
          <Route path='/testimonial' element={<TestimonialPage />} />
          <Route path='/invoice' element={<InvoiceGenerating />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AllRoute;
