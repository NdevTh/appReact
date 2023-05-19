import React, { memo, useState } from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button, View} from 'react-native';
import {emailValidator, passwordValidator} from '../core/utils';
import Header from '../Components/Header';
import { theme } from '../core/theme';
import * as SQLite from 'expo-sqlite'

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            newpassword: ""
        };
    }
    alert(){
        Alert.alert(
            'Erreur',
            'Email ou mot de passe incorrect',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }
    onSendPressed (){
        const emailError = emailValidator(this.state.email);
        const newpasswordError = passwordValidator(this.state.newpassword)

        if (emailError || newpasswordError) {
            alert()
            return;
        }else{
            const db = SQLite.openDatabase("database.db");
            db.transaction(
                tx => {
                    tx.executeSql("update user set mdp = ? where mail = ?", [this.state.newpassword, this.state.email]);
                }
            );
            this.props.navigation.navigate('Loginscreen');
        }
    };
    render(){
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header>Reinitialiser son mot de passe</Header>

                <TextInput
                    label="E-mail address"
                    returnKeyType="next"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <View class={styles.view}></View>

                <TextInput
                    label="New password"
                    returnKeyType="done"
                    value={this.state.newpassword}
                    onChangeText={text => this.setState({ newpassword: text })}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                />
                <View class={styles.view}></View>

                <Button onPress={() => this.onSendPressed()} style={styles.button} title="Valider"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
    input: {
        backgroundColor: "#ffffff",
    },
    view: {
        height: 40
    }
});

