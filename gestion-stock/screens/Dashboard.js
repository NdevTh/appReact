import React from 'react';
import {View, Button} from 'react-native';

import Header from '../Components/Header';
import Paragraph from '../Components/Paragraph';

export default class Dashboard extends React.Component{
    render(){

        console.log(this.props)
            return (
                <View>
                    <Header title="Vous etes connecté"/>
                    <Paragraph>
                        Bienvenu {this.props.route.params.username} sur notre application de gestion de stock
                    </Paragraph>
                    <Paragraph>
                        Bienvenu {this.props.route.params.username} je ne sais pas comment faire ? 
                    </Paragraph>
                    
                    <Button onPress={() => this.props.navigation.navigate('Homescreen')} title="Déconnexion"/>
                </View>
            );
    }
};æ
