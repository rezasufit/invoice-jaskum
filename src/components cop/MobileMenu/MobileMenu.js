import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
import './style.css';

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
    },
    {
        id: 6,
        title: 'Service',
        link: '/service-s2',
    },
    {
        id: 88,
        title: 'Contact',
        link: '/contact',
    }
];

const MobileMenu = () => {
    const [openId, setOpenId] = useState(0);
    const [menuActive, setMenuState] = useState(false);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
        setMenuState(false); // optionally close menu after click
    };

    return (
        <div>
            <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
                <div className="menu-close">
                    <div className="clox" onClick={() => setMenuState(!menuActive)}>
                        <i className="ti-close"></i></div>
                </div>

                <ul className="responsivemenu">
                    {menus.map((item, mn) => (
                        <ListItem className={item.id === openId ? 'active' : ''} key={mn}>
                            {item.submenu ? (
                                <Fragment>
                                    <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>
                                        {item.title}
                                        <i className={item.id === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                    </p>
                                    <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                        <List className="subMenu">
                                            {item.submenu.map((submenu, i) => (
                                                <ListItem key={i}>
                                                    <NavLink 
                                                        onClick={ClickHandler}
                                                        to={submenu.link}
                                                        className={({ isActive }) => isActive ? 'active' : ''}
                                                    >
                                                        {submenu.title}
                                                    </NavLink>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </Fragment>
                            ) : (
                                <NavLink 
                                    to={item.link} 
                                    onClick={ClickHandler}
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                >
                                    {item.title}
                                </NavLink>
                            )}
                        </ListItem>
                    ))}
                </ul>
            </div>

            <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
                <button type="button" className="navbar-toggler open-btn">
                    <span className="icon-bar first-angle"></span>
                    <span className="icon-bar middle-angle"></span>
                    <span className="icon-bar last-angle"></span>
                </button>
            </div>
        </div>
    );
};

export default MobileMenu;
