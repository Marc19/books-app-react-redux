import React from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainLayout({children, ...rest}){
    return(
        <React.Fragment>
            <Navbar {...rest}/>
            <div className="container">
                {children}
            </div>
        </React.Fragment>
    )
}

export default MainLayout;