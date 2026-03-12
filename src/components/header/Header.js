import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import HeaderTopbar from '../HeaderTopbar/HeaderTopbar'
import MobileMenu from '../MobileMenu/MobileMenu'
// import Logo from '../../images/jaskum-logo.png'
import Logo from '../../images/jaskum-logo.png'


const Header = (props) => {
    const [menuActive, setMenuState] = useState(false);
    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <header id="header" className={props.topbarNone}>
            {/* <HeaderTopbar /> */}
            <div className={`wpo-site-header ${props.hclass}`}>
                <nav className="navigation navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                                <div className="mobail-menu">
                                    <MobileMenu />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-6">
                                <div className="navbar-header">
                                    <Link onClick={ClickHandler} className="navbar-brand" to="#"><img src={Logo}
                                        alt="" /></Link>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-1 col-1">
                                <div id="navbar" className="collapse navbar-collapse navigation-holder">
                                    <button className="menu-close"><i className="ti-close"></i></button>
                                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                                        <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} to="#">Home</Link>
                                            {/* <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} to="/home">Home style 1</Link></li>
                                                <li><Link onClick={ClickHandler} to="/home2">Home style 2</Link></li>
                                                <li><Link onClick={ClickHandler} to="/home3">Home style 3</Link></li>
                                            </ul> */}
                                        </li>
                                        {/* <li><Link onClick={ClickHandler} to="/about">About</Link></li> */}
                                        <li className="menu-item-has-children">
                                            <Link to="#service">Services</Link>
                                            {/* <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} to="/service">Service</Link></li>
                                                <li><Link onClick={ClickHandler} to="/service-s2">Service style 2</Link></li>
                                                <li><Link onClick={ClickHandler} to="/service-single/1">Service Single</Link></li>
                                            </ul> */}
                                        </li>
                                        {/* <li className="menu-item-has-children">
                                            <Link to="/project">Pages</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} to="/project">Project</Link></li>
                                                <li><Link onClick={ClickHandler} to="/project-single/1">Project Single</Link></li>
                                                <li><Link onClick={ClickHandler} to="/team-single/1">Team Single</Link></li>
                                                <li><Link onClick={ClickHandler} to="/appointment">Appointment</Link></li>
                                                <li><Link onClick={ClickHandler} to="/terms">Terms & Conditions</Link></li>
                                                <li><Link onClick={ClickHandler} to="/testimonial">Testimonial</Link></li>
                                                <li><Link onClick={ClickHandler} to="/pricing">Pricing</Link></li>
                                                <li><Link onClick={ClickHandler} to="/404">Error 404</Link></li>
                                                <li><Link onClick={ClickHandler} to="/login">Login</Link></li>
                                                <li><Link onClick={ClickHandler} to="/register">Register</Link></li>
                                            </ul>
                                        </li> */}
                                        {/* <li className="menu-item-has-children">
                                            <Link onClick={ClickHandler} to="/blog">Blog</Link>
                                            <ul className="sub-menu">
                                                <li><Link onClick={ClickHandler} to="/blog">Blog right sidebar</Link></li>
                                                <li><Link onClick={ClickHandler} to="/blog-left-sidebar">Blog left sidebar</Link></li>
                                                <li><Link onClick={ClickHandler} to="/blog-fullwidth">Blog fullwidth</Link></li>
                                                <li className="menu-item-has-children">
                                                    <Link onClick={ClickHandler} to="/">Blog details</Link>
                                                    <ul className="sub-menu">
                                                        <li><Link onClick={ClickHandler} to="/blog-single/1">Blog details right sidebar</Link>
                                                        </li>
                                                        <li><Link onClick={ClickHandler} to="/blog-single-left-sidebar/1">Blog details left
                                                            sidebar</Link></li>
                                                        <li><Link onClick={ClickHandler} to="/blog-single-fullwidth/1">Blog details
                                                            fullwidth</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li> */}
                                        <li><Link to="#footer">Contact</Link></li>
                                       <li>
                                            <Link to="https://www.instagram.com/jaskum.id/" target="_blank" rel="noopener noreferrer">
                                            Instagram
                                            </Link>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                            <div className="col-lg-3 col-md-2 col-2">
                                <div className="header-right">
                                    <div className="header-search-form-wrapper">
                                        <div className="cart-search-contact">
                                            <button
                                                onClick={() => window.location.href = 'tel:081280165611'}
                                                className="search-toggle-btn"
                                            >
                                                <i className="fa-brands fa-whatsapp" 
                                                style={{ fontSize: '20px' }}
                                                aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="close-form">
                                        <a onClick={ClickHandler} 
                                        className="theme-btn" 
                                        target='_blank'
                                        href="https://wa.me/6281280165611?text=Halo%20admin"> <i className="fa-brands fa-whatsapp"
                                            aria-hidden="true"></i>
                                            <span>Hubungi Kami :</span>081280165611</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;