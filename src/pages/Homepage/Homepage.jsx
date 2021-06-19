import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.svg'
import HomepageCSS from './HomepageCSS.module.css'

const Homepage = () => {
    const name = localStorage.getItem('username')
    const [loaded,setLoaded] = useState(false);


    function onLoadHandler(){
        setLoaded(true)
    }

    return (
        <div className={`container ${HomepageCSS.container}`}>
            <div className={`card ${HomepageCSS.card}`}>
                <div className={HomepageCSS.imgdiv} style={{animationPlayState: !loaded && 'paused',display: !loaded &&  'none'}}>
                    <img src={logo} alt="logo" onLoad={onLoadHandler} className={HomepageCSS.img} draggable="false" />
                </div>
                <h1 className={HomepageCSS.h1}>Brain Wave</h1>
                
                <Link to={`${name ? '/main' : '/name'}`}>
                    <button className={`btn btn-primary ${HomepageCSS.btn}`}>Get Started</button>
                </Link>
            </div>
        </div>
    )
}

export default Homepage
