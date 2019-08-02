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
        repos : null,
        isSearching : false,
        errorMessage : null
    };

    componentDidMount(){
        console.log(this);
        this.getReposForUsername( this.props.navigation.getParam('username') );
    }

    getReposForUsername = async ( username ) => {
        this.setState({
            isSearching : true,
            errorMessage : null
        });


        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=user:${ username }&sort=stars&order=desc&per_page=10`);

            if( response.status === 200 && _.isArray( response.data.items ) ){
                const repoList = response.data.items.map( item => ({
                    key : item.id,
                    name : item.name,
                    description : item.description,
                    stars : item.stargazers_count
                }));

                this.setState({
                    repos : repoList,
                    isSearching : false
                });
            }
            else {
                this.setState({
                    errorMessage : 'Username not found',
                    isSearching : false
                });
            }

        }
        catch ( exception ) {
            this.setState({
                errorMessage : 'Username not found',
                isSearching : false
            });
        }

        console.log(response);
    };

    render(){
        return (
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View style={ styles.container }>
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
                                                    <View style={ styles.item }>
                                                        <Text style={styles.itemName}>{item.name}</Text>
                                                        <Text style={styles.itemDescription}>{item.description}</Text>
                                                        <Text style={ styles.stars }>{ item.stars } stars</Text>
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
