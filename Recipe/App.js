import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            loggedin: false,
            data: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hello World!</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={Username => this.setState({ Username })}
                        value={this.state.text}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={Password => this.setState({ Password })}
                        value={this.state.text}
                    />
                </View>
                <Button title="Login" onPress={this.login} />
                <View>
                    <Text>{this.state.data}</Text>
                </View>
            </View>
        );
    }
    //this function must be inside the component to change state
    login = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        fetch('http://localhost:5000/api/users/login', {
            headers,
            method: 'POST',
            body: JSON.stringify({
                Username: this.state.Username,
                Password: this.state.Password,
            }),
        }) //parses the json data from the response of the server
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                if (responseJson.success === true) {
                    //the component is rendered when state is changed
                    this.setState({ loggedin: true });
                    this.setState({ data: 'success' });
                }
                if (responseJson.success === false) {
                    this.setState({ loggedin: false });
                    this.setState({ data: responseJson.data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: '#000000',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        margin: 10,
        padding: 10,
    },
});
