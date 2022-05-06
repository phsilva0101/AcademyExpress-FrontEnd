import React, {useState} from "react";
import './login.css';
import logoLogin from '../../assets/login.png'
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history =  useNavigate();

    async function login(event){
        event.preventDefault();

        const data = {
           email,password 
        }

        try {
            
            const response = await api.post('/api/Account/LoginUser', data)

            localStorage.setItem('email', email)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('expiration', response.data.expiration)

            history('/alunos');


        } catch (error) {
            alert('O Login falhou!' + error)
        }
    }

    return(
        <div className="login-container">
        <section className="form">
            <img src={logoLogin} alt="Login" id="logoLogin" ></img>
        <form onSubmit={login}>
            <h1>Academy Express</h1>
            <input placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)}></input>

            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}></input>

            <button class="button" type="submit">Login</button>
        </form>
        </section>
        </div>
    )
}