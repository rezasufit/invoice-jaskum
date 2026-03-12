import React, { useEffect } from "react";
import Services from '../../api/service';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Commercial = () => {
    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: false });
    }, []);

    return (
        <div className="wpo-service-wrap wpo-service-slide">
            <div className="row">
                {Services.slice(0, 13).map((service, srv) => (
                    <div className="col-lg-4 col-md-6 col-12" key={srv}>
                        {/* <div className="wpo-service-item" data-aos="fade-right" data-aos-delay={srv * 100}> */}
                        <div className="wpo-service-item" data-aos="fade-right">
                            <div className="wpo-service-text">
                                <h2>{service.sTitle}</h2>
                                {/* <div className="wpo-service-icon">
                                    <video
                                        src={service.sIcon}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="none"
                                        className="w-100"
                                    />
                                </div> */}
                                <div className="wpo-service-icon">
                                    {service.sIcon.endsWith('.mp4') ? (
                                        <video
                                        src={service.sIcon}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="none"
                                        className="w-100"
                                        />
                                    ) : (
                                        <img src={service.sIcon} className="w-100" alt="icon" />
                                    )}
                                    </div>

                                {/* <p>{service.description}</p> */}
                                <p dangerouslySetInnerHTML={{ __html: service.description }} />
                                <div className="clearfix"></div>
                                {/* <div className="slide-btns">
                                    <a 
                                        href={service.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="theme-btn"
                                        onClick={ClickHandler}
                                    >
                                        <i className="fa fa-angle-double-right"></i> {service.sHarga}
                                    </a>
                                </div> */}
                                <div className="slide-btns">
                                    {service.sHarga && (
                                        <a 
                                        href={service.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="theme-btn"
                                        onClick={ClickHandler}
                                        >
                                        <i className="fa fa-angle-double-right"></i> {service.sHarga}
                                        </a>
                                    )}
                                    </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Commercial;
