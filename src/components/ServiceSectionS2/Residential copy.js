import React from "react";
import Services from '../../api/service'
import { Link } from "react-router-dom";


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Commercial = (props) => {

    return (
        <div className="wpo-service-wrap wpo-service-slide">
            <div className="row">
                {Services.slice(0, 6).map((service, srv) => (
                    <div className="col-lg-4 col-md-6 col-12" key={srv}>
                        <div className="wpo-service-item">
                            <div className="wpo-service-text">
                                <h2>{service.sTitle}</h2>
                                <div className="wpo-service-icon">
                                {/* <div className="icon"> */}
                                    {/* <img src={service.sIcon} alt="" /> */}
                                    <video src={service.sIcon} 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline 
                                    preload="none"
                                    className="w-100" />

                                {/* </div> */}
                                </div>

                                <p>{service.description}</p>
                                {/* <div className="slide-btns">
                                    <Link onClick={ClickHandler} to={`/service-single/${service.Id}`}>
                                {service.sHarga}</Link> */}
                                    
                            <div className="clearfix"></div>
                                        <div className="slide-btns">
                                            <Link to="/about" className="theme-btn">
                                            <i className="fa fa-angle-double-right">
                                                </i> {service.sHarga}</Link>
                                        </div>
                                    </div>                                
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Commercial;