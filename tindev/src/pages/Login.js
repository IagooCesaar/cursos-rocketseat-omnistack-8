import React, { useState, useEffect } from 'react';
import { 
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    Image, 
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Logo from '../assets/logo.png';

import api from '../services/Api';

export default function Login({ navigation }){
    const [user, setUser] = useState('');
    useEffect(
        () => {
            AsyncStorage.getItem('user').then(user => {
                if (user) {
                    console.log('Encontrado dados do último usuário: '+user)
                    navigation.navigate('Main',{ user })
                    return
                }
                console.log('Não foram encontrados dados do último login',
                    'Aguardando interação do usuário')
            })
        },
        [] //somente uma unica vez
    )
    async function handleLogin() {
        console.log('tentativa de login de '+user);
        
        const response = await api.post('/devs',{
            username: user
        });
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', {user: _id });

        console.log(response.data);

    }
    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
        >            
            <Image source={Logo} />
            <TextInput 
                style={styles.input}
                placeholder="Digite seu usuário no Github para acessar"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={user}
                onChangeText={setUser}

            />            
            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4, 
        marginTop: 20,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4723',
        borderRadius: 4,
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});