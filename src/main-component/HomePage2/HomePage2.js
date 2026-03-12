import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Hero2 from '../../components/hero2/Hero2'
import Scrollbar from '../../components/scrollbar/scrollbar'
import ServiceSectionS2 from '../../components/ServiceSectionS2/ServiceSectionS2';
import WorkSection from '../../components/WorkSection/WorkSection';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
// import Appointment from '../../components/Appointment/Appointment';
// import TeamSection from '../../components/TeamSection/TeamSection';
// import Testimonial from '../../components/Testimonial/Testimonial';
import BlogSection from '../../components/BlogSection/BlogSection.js';
import PartnerSection from '../../components/PartnerSection/PartnerSection';
import Footer from '../../components/footer/Footer.js';
import BlogPortfolio from '../../components/BlogSection/BlogPortofolio.js';


const HomePage2 =() => {
    return(
        <Fragment>
            <Navbar/>
            <Hero2/>
            <BlogSection/>
            <ServiceSectionS2/>
            <BlogPortfolio />
            <WorkSection/>
            <ProjectSection/>
            {/* <Appointment/> */}
            {/* <TeamSection/> */}
            {/* <Testimonial/> */}
            <PartnerSection/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default HomePage2;