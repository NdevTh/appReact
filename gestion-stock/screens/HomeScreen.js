import React from 'react';
import Header from '../Components/Header';
import { View, StyleSheet, Button } from 'react-native';
import * as SQLite from 'expo-sqlite'


export default class HomeScreen extends React.Component {
    componentDidMount(){
        const db = SQLite.openDatabase("database.db");
        db.transaction(tx => {
            tx.executeSql("create table if not exists user (id integer primary key not null, name text, mail text, mdp text);");
        });
    }
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header title="Bienvenu "/>
                <Button
                    onPress={() => navigate('Loginscreen')}
                    title="Connexion"/>
                <View style={styles.espace}></View>
                <Button
                    onPress={() => navigate('Registerscreen')}
                    title="Inscription"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    espace: {
        height: 20,
    }
});
