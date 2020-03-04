import React, { useEffect, useState } from 'react';
import'./Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

import api from '../services/api';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);
    // useEffect(() => {}, []) recebe dois parâmetros: a função que quero executar
    //e o segundo é quando eu quero que a função seja executada
    useEffect(() => { // não é recomendado colocar async direto nessa primeira função, por isso criada a segunda
        async function loadUser() {
            const response = await api.get('/devs',{
                headers: {
                    user: match.params.id,
                }
            })    
            setUsers(response.data);
        };
        loadUser();
    }, [
        match.params.id // toda vez q o ID for alterado a função será executada
    ]);

    return (
        <div className="main-container">
            <img src={logo} alt="Tindev" />
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name} />
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>                    
                        </footer>
                        <div className="buttons">
                            <button type="button">
                                <img src={dislike} alt="Dislike" />                                
                            </button>
                            <button type="button">
                                <img src={like} alt="Like" />                                
                            </button>
                        </div>
                    </li>
                ))}                                
            </ul>
        </div>
    )
}