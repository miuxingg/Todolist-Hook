import React from 'react';
import { useHistory } from 'react-router';


function Header(props) {
    const {setSignOut} = props;
    const {name} = props;
    const history = useHistory();
    const onHandleClick = (e)=>{
        e.preventDefault();
        localStorage.removeItem('token');
        setSignOut();
        history.push("/");
    }
    return (
        <div className="nav-header">
        <div className="container">
            <ul className="nav">
                <li>Hello! {name}</li>
                <li onClick = {onHandleClick} className = "sign-out">Sign Out</li>
            </ul>
        </div>
    </div>
    );
}

export default Header;