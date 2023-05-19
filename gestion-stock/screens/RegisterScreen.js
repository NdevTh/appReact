import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button} from 'react-native';
import Header from '../Components/Header';
import {
    emailValidator,
    passwordValidator,
    nameValidator,
} from '../core/utils';
import * as SQLite from 'expo-sqlite'


class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        //initialise les states
        this.state = {
            name: "",
            email: "",
            password: "",
        };
    }

    alerte(){
        Alert.alert(
            'Erreur',
            'Veuillez remplir correctement les champs',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    onSignUpPressed (){
        console.log("click");
        // ajouter mon code
        console.log("name");
        console.log("password");
        // fin ajouter mon code
        console.log(this.props);
        const nameError = nameValidator(this.state.name);
        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);
        if (emailError || passwordError || nameError) {
            this.alerte()
            return;
        } else {
            const db = SQLite.openDatabase("database.db");
            db.transaction(
                tx => {
                    tx.executeSql("insert into user (name, mail, mdp) values (?, ?, ?)", [this.state.name, this.state.email, this.state.password]);
                    console.log('lol');
                }
            );
            // console.log(this.props)
            this.props.navigation.navigate('Loginscreen')
        }
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Header title="Inscription"/>
                <TextInput
                    placeholder='Nom'
                    label="Nom"
                    style={{ height: 40, borderColor: 'gray',  borderWidth: 1, margin: 10}}
                    returnKeyType="next"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />
                <View class={styles.view}></View>
                <TextInput
                    placeholder='E-mail'
                    label="E-mail"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    returnKeyType="next"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <View class={styles.view}></View>

                <TextInput
                    placeholder='Mot de passe'
                    label="Mot de passe"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    returnKeyType="done"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <View class={styles.view}></View>
                <Button onPress={() => this.onSignUpPressed() } 
                title="Inscription" style={styles.button}/>
                <View style={styles.row}>
                    <Text style={styles.label}>Déja inscrit ? </Text>
                    <TouchableOpacity onPress={() => navigate('Loginscreen')}>
                        <Text style={styles.link}>Connectez-vous</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    label: {
        color: '#600EE6',
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: '#600EE6',
    },
    input: {
        backgroundColor: "#ffffff",
    },
    view: {
        height: 40
    }
});
export default (RegisterScreen)
