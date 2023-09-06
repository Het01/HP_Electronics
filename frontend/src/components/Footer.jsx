import React from 'react'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="text-center text-lg-start" style={{marginTop:"auto"}}>
            <hr />
            <div className="text-center p-3">
                © 2023 Copyright : 
                <Link  to="/"> HPElectronics</Link>
            </div>
            
        </footer>
    )
}

export default Footer