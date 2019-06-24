import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './container/Login';
import Profile from './container/Profile';

const MainNavigator = createStackNavigator(
    {
        Login: { screen: Login },
        Profile: { screen: Profile },
    },
    {
        initialRouteName: 'Login',
    }
);

const App = createAppContainer(MainNavigator);

export default App;
