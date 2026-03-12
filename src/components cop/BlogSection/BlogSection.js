import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import blogs from '../../api/blogs'
import { Link } from "react-router-dom";

const BlogSection = () => {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        arrows: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false,
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
                        <div className="wpo-section-title-s2">
                            <h2>Klien Terpercaya Kami</h2>
                            <p>Kami bangga telah bekerja sama dengan berbagai klien 
                                yang sudah mempercayakan layanan kepada kami.</p>
                        </div>
                    </div>
                </div>
                <div className="wpo-blog-wrap wpo-blog-slide owl-carousel">
                    <Slider ref={sliderRef} {...settings}>
                        {blogs.map((blog, bl) => (
                            <div className="wpo-blog-item" key={bl}>
                                <div className="wpo-blog-img">
                                    {/* <img src={blog.screens} alt="" /> */}
                                    <video 
                                        src={blog.screens}
                                        poster={blog.thumbnail}
                                        // autoPlay 
                                        // muted 
                                        controls
                                        loop 
                                        playsInline 
                                        style={{ width: '100%', height: 'auto' }}
                                        onPlay={handlePlay}
                                        onPause={handlePause}
                                    />
                                </div>
                                <div className="wpo-blog-text">
                                    <h2>{blog.title}</h2>
                                    {/* <h2><Link onClick={ClickHandler} to={`/blog-single/${blog.id}`}>{blog.title}</Link></h2> */}
                                    {/* <ul>
                                        <li><i className="fa fa-calendar-o" aria-hidden="true"></i> {blog.create_at}</li>
                                        <li><i className="fa fa-heart" aria-hidden="true"></i> {blog.comment}</li>
                                    </ul> */}
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default BlogSection;
