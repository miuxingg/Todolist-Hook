import React from 'react';
import {Link} from 'react-router-dom'
function Header(props) {
    const {userName} = props
    const onClickHandle = (e)=>{
        localStorage.removeItem('token');
    }
    return (
        <div className="header">
            <div className="container">
                {
                    localStorage.getItem('token') 
                    ?   (<ul className="nav">
                            <li><Link to="/home">Hello! {userName}</Link></li>
                            <li><Link to = "/" onClick = {onClickHandle}>Sign Out</Link></li>
                        </ul>)
                    : ""
                }
                
            </div>
        </div>

    );
}

export default Header;