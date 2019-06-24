import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

interface State {
    username: string;
    password: string;
    loggedin: boolean;
    data: string;
}
export default class Login extends React.Component<Props, State> {
    static navigationOptions = {
        title: 'Welcome',
    };
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
                        onChangeText={username => this.setState({ username })}
                        value={this.state.username}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="default"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
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
                Username: this.state.username,
                Password: this.state.password,
            }),
        }) //parses the json data from the response of the server
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                if (responseJson.success === true) {
                    //the component is rendered when state is changed
                    this.setState({ loggedin: true });
                    this.setState({ data: 'success' });
                    this.props.navigation.navigate('Profile');
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
