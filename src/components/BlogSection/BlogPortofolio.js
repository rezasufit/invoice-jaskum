import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

import portfolio from '../../api/portfolio';
import { Link } from "react-router-dom";

const BlogPortfolio = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: false });
    }, []);

    const settings = {
        dots: true,
        arrows: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        afterChange: () => {
        AOS.refresh();
    },
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handlePlay = () => {
        sliderRef.current?.slickPause();
    };

    const handlePause = () => {
        sliderRef.current?.slickPlay();
    };

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <section className="wpo-blog-section section-padding">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6">
                        <div className="wpo-section-title-s2" data-aos="fade-right">
                            <h2>Pekerjaan Kami</h2>
                            {/* <p>
                                Kami bangga telah bekerja sama dengan berbagai klien 
                                yang sudah mempercayakan layanan kepada kami.
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="wpo-blog-wrap wpo-blog-slide owl-carousel" data-aos="fade-right" data-aos-delay="200">
                    <Slider ref={sliderRef} {...settings}>
                        {portfolio.map((blog, bl) => (
                            // <div className="wpo-blog-item" key={bl} data-aos="zoom-in" data-aos-delay={(bl % 3) * 150}>
                            <div className="wpo-blog-item" key={bl} data-aos="zoom-in">
                                {/* <div className="wpo-blog-text">
                                    <h2>{blog.title}</h2>
                                </div> */}
                                <div className="wpo-blog-img">
                                    <video 
                                        src={blog.screens}
                                        // poster={blog.thumbnail}
                                        // preload="none"
                                        controls
                                        // loop 
                                        playsInline 
                                        style={{ width: '100%', height: 'auto' }}
                                        onPlay={handlePlay}
                                        onPause={handlePause}
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default BlogPortfolio;
