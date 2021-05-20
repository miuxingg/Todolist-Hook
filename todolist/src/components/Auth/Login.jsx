import React, { useState } from 'react';
import './style.css';
import {useHistory} from 'react-router'
import axios from 'axios';

function Login(props) {
    const {getUserName} = props;
    const [inputUser, setInputUser] = useState({
        email : "",
        password :""
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    const onChangeHandle = (e) => {
        setInputUser({...inputUser, [e.target.name] : e.target.value});
    }
    const onSubmitHandle = async (e) => {
        e.preventDefault();
        try {
            const option = {
                method : 'post',
                url : '/api/v1/auth/login',
                data : inputUser,
            }
            const response = await axios(option);
            const {token, userName} = response.data.data;
            localStorage.setItem('token', token);
            getUserName(userName);
            history.push('/home');
        } catch (error) {
            setErrorMessage(error);
            console.log(errorMessage);
        }
    }
    const onClickRegister = (e) => {
        e.preventDefault();
        history.push('/register');
    }
    return (
        <div className="login">
            <div className="container">
                <form className="form-login" onSubmit = {onSubmitHandle}>
                <span className="logo">login</span>
                <input 
                    className="input-text" 
                    type="text" 
                    placeholder="Email" 
                    name = "email"
                    value = {inputUser.email}
                    onChange = {onChangeHandle}
                    />
                <input 
                    className="input-text" 
                    type="password" 
                    placeholder="Password" 
                    name = "password"
                    value = {inputUser.password}
                    onChange = {onChangeHandle}/>
                <div>
                    <button type="submit" className="btn">Login</button>
                    <button type="submit" className="btn" onClick = {onClickRegister}>Register</button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Login;