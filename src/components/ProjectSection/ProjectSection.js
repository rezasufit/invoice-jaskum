import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Projects from '../../api/project';

const settings = {
    dots: false,
    arrows: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true }},
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true }},
        { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 }},
        { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 }},
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 }}
    ]
};

const ProjectSection = () => {
    const [sliderRef, setSliderRef] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: false });
    }, []);

    // Fungsi ini dipanggil setiap slide berubah
    const handleAfterChange = () => {
        AOS.refresh(); // Refresh AOS supaya animasi aktif lagi
    };

    return (
        <section className="wpo-project-section section-padding" data-aos="fade-up">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-5">
                        <div className="wpo-section-title">
                            <h2>Hasil Kerja Kami</h2>
                            <p>Beberapa contoh proyek yang pernah kami tangani — semuanya dikerjakan dengan sepenuh hati.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="wpo-project-slider">
                            <Slider
                                {...settings}
                                ref={setSliderRef}
                                afterChange={handleAfterChange} // panggil refresh saat slide berganti
                            >
                                {Projects.slice(0, 6).map((project, prj) => (
                                    <div
                                        className="item"
                                        key={prj}
                                        data-aos="fade-left"
                                        data-aos-delay={prj * 150}
                                    >
                                        <div className="single-work">
                                            <img className="img-responsive" src={project.pImg} alt="" />
                                            <div className="hover_layer">
                                                <div className="info">
                                                    <h3>
                                                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                            {project.title}
                                                        </a>
                                                    </h3>
                                                    <p>{project.subTitle}</p>
                                                </div>
                                                <div className="details-btn">
                                                    <a
                                                        className="project-btn"
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >+</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
