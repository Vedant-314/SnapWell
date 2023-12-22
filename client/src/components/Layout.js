import React, { useState } from 'react'
import '../layout.css'
import logo from "../logo.png"
import logoC from "../logoC.png"
import {Link, useLocation} from "react-router-dom"
import {useSelector} from "react-redux";
function Layout({children}) {
    const [collapsed, setCollapsed] = useState(false);
    const {user} = useSelector((state) => state.user);

    const location = useLocation();
  const userMenu = [
    {
        name: 'Home',
        path: '/',
        icon: 'ri-home-line'
    },
    {
        name: 'Appointments',
        path: '/appointments',
        icon: 'ri-book-marked-line'
    },
    {
        name: 'Apply Doctor',
        path: '/apply-doctor',
        icon: 'ri-stethoscope-line'
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'ri-user-line'
    },
    {
        name: 'Logout',
        path: '/logout',
        icon: 'ri-logout-circle-r-line'
    },
  ];

  const menuToBeRendered = userMenu;

  return (
    <div className='main'>
        <div className='d-flex layout'>
            <div className={`${collapsed ? 'collapsed-sidebar': 'sidebar'}`}>
                <div className='sidebar-header'>
                    {!collapsed ? <img src={logo} alt="logo"/> : <img src={logoC} alt="logo"></img> }
                    
                </div>
                <div className='menu'>
                    {menuToBeRendered.map((menu) =>{
                        const isActive = location.pathname === menu.path
                        return <div className= {`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                            <i className={menu.icon}></i>
                            {!collapsed && <Link to={menu.path} >{menu.name}</Link>}
                            
                        </div>
                    })}
                </div>
            </div>
            <div className='content'>
                <div className='header'>
                    {!collapsed ? <i className='ri-close-fill header-icon' onClick={()=>setCollapsed(true)}></i> : <i className='ri-menu-fill header-icon' onClick={()=>setCollapsed(false)}></i>}
                    <div className='d-flex align-items-center px-4'>
                        <i className='ri-notification-line header-icon px-3'></i>
                        <Link className='anchor' to="/profile">{user?.name}</Link>
                    </div>
                </div>
                <div className='body'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout