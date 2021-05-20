import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './style.css';

function Register(props) {

    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const history = useHistory();
    const onChangeHandle = (e) => {
        setInputUser({...inputUser, [e.target.name] : e.target.value});
    }
    const onSubmitHandle = async (e)=>{
        try {
            e.preventDefault();
            const option = {
                method : 'post',
                url: '/api/v1/auth/register',
                data: inputUser,
            }
            const res = await axios(option);
            if(res.data.data.token){
                history.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="login">
            <div className="container">
                <form className="form-login form-register" onSubmit = {onSubmitHandle}>
                <span className="logo">Register</span>
                <input 
                    className="input-text" 
                    type="text" 
                    placeholder="Username" 
                    name ="name"
                    value = {inputUser.name}
                    onChange = {onChangeHandle}
                    />
                <input 
                    className="input-text" 
                    type="text" 
                    placeholder="Email" 
                    value = {inputUser.email}
                    name="email"
                    onChange = {onChangeHandle}
                    />
                <input 
                    className="input-text" 
                    type="password" 
                    placeholder="Password" 
                    value = {inputUser.password}
                    name = "password"
                    onChange = {onChangeHandle}
                    />
                <div><button type="submit" className="btn">Register</button></div>
                </form>
            </div>
        </div>

    );
}

export default Register;