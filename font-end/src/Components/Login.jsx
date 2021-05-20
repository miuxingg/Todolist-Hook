import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function Login(props) {
    const {getName} = props;
    const [inputUser, setInputUser] = useState({
       email :"",
       password: "", 
    });
    const [error, setError] = useState(null);
    const history = useHistory();
    useEffect(() => {
        localStorage.removeItem('token');
    },[])
    const onHandleChange = (e)=>{
        setInputUser({...inputUser, [e.target.name] : e.target.value});
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const option = {
                method: "post",
                url: "/api/v1/auth/login",
                data: inputUser,
            }
            const response = await axios(option);
            const {token, userName} = response.data.data;
            localStorage.setItem('token', token);
            getName(userName);
            history.push('/home');
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className="login">
        <div className="container">
            <form className="form-login" onSubmit = {onHandleSubmit}>
            <span className="logo">login</span>
            {
                !error ? "" : <span>Error</span>
            }
            <input 
                className="input-text" 
                type="text" 
                placeholder="Email" 
                name = "email"
                onChange = {onHandleChange}
                />
            <input 
                className="input-text" 
                type="password" 
                placeholder="Password" 
                name = "password"
                onChange = {onHandleChange}
                />
            <div>
                <button type="submit" className="btn-login">Login</button>
                <Link to="/register"><button type="submit" className="btn-login" >Register</button></Link>
            </div>
            </form>
        </div>
    </div>
    );
}

export default Login;