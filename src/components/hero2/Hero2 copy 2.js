import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import hero1 from '../../images/slider/banner-jaskum-hero-1.png';
import hero2 from '../../images/slider/slide-3.jpg';

const settings = {
  dots: false,
  arrows: true,
  speed: 1200,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 8500,
  fade: true,
  afterChange: () => {
    AOS.refresh();
  }
};

const Hero2 = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: 'ease-in-out' });
  }, []);

  useEffect(() => {
    const imgs = [hero1, hero2];
    let loaded = 0;
    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded += 1;
        if (loaded === imgs.length) setImagesLoaded(true);
      };
    });
  }, []);

  return (
    <section className="wpo-hero-slider">
      <div className="hero-container">
        <div className="hero-wrapper">
          {imagesLoaded && (
            <Slider {...settings}>
              {/* SLIDE 1 */}
              <div className="hero-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${hero1})` }}
                >
                  <div className="gradient-overlay"></div>
                  <div className="container">
                    <div className="slide-content">
                      <div className="slide-title">
                        <h2 data-aos="fade-left" data-aos-delay="0">
                          Jasa Vakum Profesional, Pilihan Terbaik untukmu!
                        </h2>
                      </div>
                      <div className="slide-text">
                        <p data-aos="fade-left" data-aos-delay="200">
                          Cukup pesan online, tim kami segera datang dan membersihkan secara menyeluruh — anti ribet.
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="slide-btns">
                        <Link
                          to="#service"
                          className="theme-btn"
                          data-aos="fade-left"
                          data-aos-delay="400"
                          data-aos-anchor-placement="top-bottom"
                        >
                          <i className="fa fa-angle-double-right"></i> Pesan Sekarang!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLIDE 2 */}
              <div className="hero-slide">
                <div
                  className="slide-inner slide-bg-image"
                  style={{ backgroundImage: `url(${hero2})` }}
                >
                  <div className="gradient-overlay"></div>
                  <div className="container">
                    <div className="slide-content">
                      <div className="slide-title">
                        <h2 data-aos="fade-up" data-aos-delay="0">
                          Expert Cleaning Service You Can Trust.
                        </h2>
                      </div>
                      <div className="slide-text">
                        <p data-aos="fade-up" data-aos-delay="200">
                          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                        </p>
                      </div>
                      <div className="clearfix"></div>
                      <div className="slide-btns">
                        <Link
                          to="/tab/1"
                          className="theme-btn"
                          data-aos="fade-up"
                          data-aos-delay="400"
                        >
                          <i className="fa fa-angle-double-right"></i> Pesan Sekarang!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero2;
