import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import'./Main.css';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';

import api from '../services/api';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    // useEffect(() => {}, []) recebe dois parâmetros: a função que quero executar
    //e o segundo é quando eu quero que a função seja executada
    useEffect(() => { // não é recomendado colocar async direto nessa primeira função, por isso criada a segunda
        async function loadUser() {
            //Função que desejo executar
            const response = await api.get('/devs',{
                headers: {
                    user: match.params.id,
                }
            })    
            setUsers(response.data);
        };
        loadUser();
    }, [
        //Gatilho para execução da função -> toda vez que a variável for alterada
        match.params.id 
    ]);

    useEffect(() => { // conexão do frontend
        const socket = io('http://localhost:3333', {
            query: {
                user: match.params.id,
                app: 'frontend'
            }     
        });
        socket.on('match', dev => {
            console.log('Match registrado com ',dev);
            setMatchDev(dev);
        })        
    },
        [match.params.id]
    );

    async function handleLike(id) {
        console.log('like', id);
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        });
        setUsers(users.filter(user => user._id !== id));
        
    }
    
    async function handleDislike(id) {
        console.log('dislike', id);
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        });
        setUsers(users.filter(user => user._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>            
            { users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>                    
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike" />                                
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like" />                                
                                </button>
                            </div>
                        </li>
                    ))}                                
                </ul>
            ) : (
                <div className="empty">
                    Acabou :(
                </div>
            )}
            { matchDev && (
                <div className="match-container">
                    <img className="logo-match" src={itsamatch} alt="Its a Match" />
                    <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => {setMatchDev(null)}}>FECHAR</button>
                </div>
            )}
        </div>
    )
}