import React, { useState } from 'react';

import './Login.css';
import logo from '../assets/logo.svg';

import api from '../services/api';

export default function Login({history}) {
    const [userName, setUserName] = useState('');

    async function handleSubmit(e) {
        e.preventDefault(); // prevenir do comportamento padrão do submit, que é trocar de pagina

        console.log('Tentativa de login de usuário '+userName);
        const response = await api.post('/devs', {
            username: userName,
        });          
        console.log('Dados obtidos do usuário : '+userName,response);

        const { _id } = response.data;
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev" /> 
                <input 
                    placeholder="Digite seu usuário no Github"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

