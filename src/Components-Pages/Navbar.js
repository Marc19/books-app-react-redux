import React from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar(props){
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className={(props.isHomeActive? "active " : "") + "nav-item align-self-center"}>
                            <Link className="nav-link" to="/">My Books <span className="sr-only">(current)</span></Link>
                        </li>

                        <li className={(props.isSearchActive? "active " : "") + "nav-item align-self-center"}>
                            <Link className="nav-link" to="/search">Search books</Link>
                        </li>
                    </ul>
                </div>
            </nav>
         );
    }

 
export default Navbar;