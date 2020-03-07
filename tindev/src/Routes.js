import { 
    createAppContainer, 
    createSwitchNavigator 
} from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';


export default createAppContainer( //deve estar como container principal da aplicação
    createSwitchNavigator({ //Cria uma navegação entre telas sem qualquer feedback visual
        //Utilizaremos este estilo de navegação pois não implementa por padrão a opção de voltar, 
        //impedindo que o usuário acesse a página de login se não for
        Login,
        Main,                
    })
);