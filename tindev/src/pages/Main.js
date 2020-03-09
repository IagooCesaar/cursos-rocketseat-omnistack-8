import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Logo from '../assets/logo.png';
import Like from '../assets/like.png';
import Dislike from '../assets/dislike.png';

import api from '../services/Api';

export default function Main({ navigation }) {
    const userId = navigation.getParam('user');

    const [users, setUsers] = useState([]);
    // useEffect(() => {}, []) recebe dois parâmetros: a função que quero executar
    //e o segundo é quando eu quero que a função seja executada
    useEffect(() => { // não é recomendado colocar async direto nessa primeira função, por isso criada a segunda
        async function loadUser() {
            //Função que desejo executar
            console.log('Buscando devs para usuário '+userId);
            const response = await api.get('/devs',{
                headers: {
                    user: userId,
                }
            })    
            console.log('Dados retornados pela api', response.data)
            setUsers(response.data);
        };       
        loadUser(); // para que a função seja executada
    }, [
        //Gatilho para execução da função -> toda vez que a variável for alterada
        userId 
    ]);

    async function handleLike() {
        const [user, ...rest] = users;//Coloca 1º elemento do array em user e restantes em rest
        console.log('like', user._id);
        await api.post(`/devs/${user._id}/likes`, null, {
            headers: {
                user: userId
            }
        });
        //setUsers(users.filter(user => user._id !== id));        
        setUsers(rest);
    }
    
    async function handleDislike() {
        const [user, ...rest] = users;//Coloca 1º elemento do array em user e restantes em rest
        console.log('dislike', user._id);
        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: {
                user: userId
            }
        });
        //setUsers(users.filter(user => user._id !== id));
        setUsers(rest);
    }

    async function handleLogout() {
        console.log('Logout do usuario '+userId)

        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={Logo} style={styles.logo}/>
            </TouchableOpacity>
            
            <View style={styles.cardsContainer}>                
                { users.length === 0 ? (
                        <Text style={styles.empty}>Acabou :(</Text>
                    ) : (
                        users.map((user, index) => (                    
                            <View key={user._id} style={[styles.card, { zIndex: users.length - index } ]} >
                                <Image 
                                    style={styles.avatar} 
                                    source={{uri: user.avatar}} 
                                />
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
        
                                </View>    
                                <View />                
                            </View>   
                        )) 
                    ) 
                }   
            </View>
            { users.length > 0 && (
                 <View style={styles.buttonsContainer}>                
                    <TouchableOpacity style={styles.button} onPress={handleDislike}>
                        <Image source={Dislike} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLike}>
                        <Image source={Like} />
                    </TouchableOpacity>
                </View>
            )}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        marginTop: 30,
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },

    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,

    },

    card:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    avatar: {
        flex: 1,
        height: 300,
    },

    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,    
    },

    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
})