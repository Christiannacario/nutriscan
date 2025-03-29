import React from 'react'
import img from './img/logo1.png'
import './Design/css/Landingpage.css';
import { Link } from 'react-router-dom';

function Landingpage() {
  return (
    <>
        <div className='bg-main'>
            <div className='container'>
            <div className="scanner"></div>
                <img src={img} className='floating-image' alt="Uploaded" />
                <Link to="/login" className='btnGetstarted'>Get Started</Link>
            </div>
        </div>

    </>
  )
}

export default Landingpage
