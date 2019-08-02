import React, {Fragment} from 'react';
import {
    View, TextInput, StatusBar,
    SafeAreaView, Button, FlatList, Text,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import _ from 'underscore';

import styles from './styles.js';

export default class SearchScreen extends React.Component {
    state = {
        username : null,
        repos : null,
        isSearching : false,
        errorMessage : null
    };

    getReposForUsername = async () => {

        this.setState({
            isSearching : true,
            errorMessage : null
        });

        const response = await axios.get(`https://api.github.com/search/repositories?q=user:${ this.state.username }&sort=stars&order=desc&per_page=10`);

        if( response.status === 200 && _.isArray( response.data.items ) ){
            const repoList = response.data.items.map( item => ({
                key : item.id,
                name : item.name,
                description : item.description,
                stars : item.stargazers_count
            }));

            this.setState({ repos : repoList });
        }
        else {
            this.setState({
                errorMessage : 'Username not found'
            });
        }

        this.setState({
            isSearching : false
        });

        console.log(response);
    }

    render(){
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View style={ styles.container }>
                        <TextInput
                            style={ styles.usernameInput }
                            onChangeText={(text) => this.setState({ username : text })}
                            value={this.state.username}
                            placeholder={"Type the username"}
                        />
                        <Button title={"Search repos"} onPress={ this.getReposForUsername }/>

                        {
                            this.state.isSearching
                                ? <ActivityIndicator size="large" color="#0000ff" />
                                : (
                                    this.state.errorMessage
                                        ? <Text>Username not found</Text>
                                        : (
                                            <FlatList
                                                data={ this.state.repos}
                                                renderItem={({item}) => (
                                                    <View>
                                                        <Text style={styles.itemName}>{item.name}</Text>
                                                        <Text style={styles.itemDescription}>{item.description}</Text>
                                                        <Text style={ styles.stars }>{ item.stars }</Text>
                                                    </View>
                                                )}
                                            />
                                        )
                                )
                        }
                    </View>
                </SafeAreaView>
            </Fragment>
        );
    }
}
