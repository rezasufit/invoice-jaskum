import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Residential from './Residential';
import Commercial from './Commercial';

const ServiceSectionS2 = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const location = useLocation();

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-in-out', once: false });
    }, []);

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <section className="wpo-service-section-s2 section-padding">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-5">
                        <div className="wpo-section-title-s2" data-aos="fade-right" id="service">
                            <h2>Pelayanan Kami</h2>
                            <p>
                                Kami menawarkan jasa vakum profesional untuk rumah, kantor, dan industri. 
                                Dengan peralatan modern dan tenaga ahli, kami pastikan kebersihan maksimal 
                                di setiap sudut, cepat dan efisien.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="wpo-service-tabs" data-aos="fade-left" data-aos-delay="200">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={`theme-btn ${classnames({ active: activeTab === '1' })}`}
                                        onClick={() => toggle('1')}
                                    >
                                        <i className="ti-home"></i> Rumahan
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={`theme-btn ${classnames({ active: activeTab === '2' })}`}
                                        onClick={() => toggle('2')}
                                    >
                                        <i className="ti-brush-alt"></i> Industri
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                </div>

                <TabContent activeTab={activeTab} className="pt-4">
                    <TabPane tabId="1">
                        <div>
                            <Residential />
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <div>
                            <Commercial />
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </section>
    );
};

export default ServiceSectionS2;
