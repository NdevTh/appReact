import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from '../Components/Header';
import InputText from '../Components/InputText'
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import * as SQLite from 'expo-sqlite'

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    onLoginPressed () {
        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);
        if (emailError || passwordError) {
            alert()
            return;
        }
        const db = SQLite.openDatabase("database.db");
        db.transaction(
            tx => {
                tx.executeSql("select * from user", [], (_, { rows: { _array } }) =>{
                    console.log("login")
                    // on voit ici les inscriptions
                    console.log(_array)
                    var userConnect = false
                    for(var i=0; i<_array.length; i++){
                        if(_array[i].mail == this.state.email && _array[i].mdp == this.state.password) {
                            userConnect = true
                            this.props.navigation.navigate('Dashboard', {username: _array[i].name});
                        }
                    }
                    if(userConnect == false){
                        Alert.alert(
                            'Erreur',
                            'L\'email ou le mot de passe est incorrect',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                        );
                    }
                }
                );
            }
        );
    }

    render(){
        var data = null;
        var good = false



        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header title="Connexion"/>

                <InputText
                    placeholder="Mot de passe "
                    value={this.state.email}
                    toto={text => this.setState({ email: text })}
                />
                <View class={styles.view}></View>

                <TextInput
                    placeholder="Mot de passe "
                    label="Password"
                    returnKeyType="done"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <View class={styles.view}></View>

                <Button onPress={() => this.onLoginPressed()} style={styles.button} title="Connexion"/>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigate('Registerscreen')}>
                        <Text style={styles.link}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ForgotPasswordscreen')}>
                        <Text style={styles.link}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }

};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginLeft: 10
    },
    input: {
        backgroundColor: "white",
    },
    view: {
        height: 40
    }
});

export default (LoginScreen)
