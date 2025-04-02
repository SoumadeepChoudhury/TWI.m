"use client"

import './styles.css';
import { raleway } from '@/fonts/font';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const logout = () => {
        setIsOpen(!isOpen);
        Cookies.remove("username");
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("role");
        window.location.reload();
    }

    useEffect(() => {
        window.addEventListener('click', () => {
            if (isOpen) {
                console.log(isOpen);
                setIsOpen(false);
            }
        });

        // fetchData();
    }, [isOpen]);


    return (
        <div className="main">
            <div className='navbar'>
                <div className={raleway.className} id='nav-head'>TWI.m</div>
                <div className="dropdown-container">
                    <div id='username' onClick={toggleDropdown}>
                        <span className='material-icons'>person</span> &nbsp;&nbsp;
                        <span id="username-text">{Cookies.get("username")}</span>
                    </div>
                    {isOpen ?
                        <ul className="dropdown-menu">
                            <li><span className="material-icons">assistant_direction</span>&nbsp;&nbsp;{Cookies.get("role")}</li>
                            <li onClick={logout}><span className='material-icons'>power_settings_new</span>Logout</li>
                        </ul> : null
                    }
                </div>
            </div>
        </div>
    )
}