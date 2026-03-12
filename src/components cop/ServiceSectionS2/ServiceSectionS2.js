import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Residential from './Residential';
import Commercial from './Commercial';


const ServiceSectionS2 = (props) => {

    const [activeTab, setActiveTab] = useState('1');
    const location = useLocation();

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

      useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Scroll smooth ke elemen dengan id yg sama
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);


    return (
        <section className="wpo-service-section-s2 section-padding">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-5">
                        <div className="wpo-section-title-s2">
                            <h2>Pelayanan Kami</h2>
                            <p>Kami menawarkan jasa vakum profesional untuk rumah, kantor, dan industri. Dengan peralatan modern dan tenaga ahli, kami pastikan kebersihan maksimal di setiap sudut, cepat dan efisien.</p>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="wpo-service-tabs">
                            <Nav tabs id='service'>
                                <NavItem>
                                    <NavLink
                                        className={`theme-btn ${classnames({ active: activeTab === '1' })}`}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        <i className="ti-home"></i> Rumahan
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={`theme-btn ${classnames({ active: activeTab === '2' })}`}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        <i className="ti-brush-alt"></i> Industri
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                </div>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Residential/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Commercial/>
                    </TabPane>
                </TabContent>
            </div>
        </section>

    )
}

export default ServiceSectionS2;