import React from 'react';
import {Button, SafeAreaView, TextInput, View} from 'react-native';
import styles from '../SearchScreen/styles';

export default class MainScreen extends React.Component {
    state ={
        username : null
    };

    goToSearchScreen = () => {

        this.props.navigation.navigate('Search' , {
            username : this.state.username
        });

    };

    render(){
        return (
             <SafeAreaView>
                 <TextInput
                     style={ styles.usernameInput }
                     onChangeText={(text) => this.setState({ username : text })}
                     value={this.state.username}
                     placeholder={"Type the username"}
                 />
                 <Button title={"Find most successful repositories"} onPress={ this.goToSearchScreen }/>

             </SafeAreaView>
        )
    }
}
