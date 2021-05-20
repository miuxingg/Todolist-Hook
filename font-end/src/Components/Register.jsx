import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function Register(props) {
    const {getName} = props;
    const [inputUser, setInputUser] = useState({});
    const history = useHistory();
    const onHandleChange = (e) => {
        setInputUser({...inputUser, [e.target.name] : e.target.value});
    }
    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const option = {
                method : 'post',
                url :"/api/v1/auth/register",
                data: inputUser
            }
            const response = await axios(option);
            const {token, userName} = response.data.data;
            localStorage.setItem('token', token);
            getName(userName);
            history.push('/home');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div class="login">
        <div class="container">
            <form class="form-login form-register" onSubmit = {onHandleSubmit}>
            <span class="logo">Register</span>
            <input 
                class="input-text" 
                type="text" 
                placeholder="Username" 
                name ="name"
                onChange = {onHandleChange}
                />
            <input 
                class="input-text" 
                type="text" 
                placeholder="Email" 
                name = "email"
                onChange = {onHandleChange}
                />
            <input 
                class="input-text" 
                type="password" 
                placeholder="Password" 
                name = "password"
                onChange = {onHandleChange}
                />
            <div><button type="submit" class="btn-login">Register</button></div>
            </form>
        </div>
    </div>
    );
}

export default Register;