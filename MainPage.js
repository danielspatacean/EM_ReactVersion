'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Alert,
    Navigator,
    ListView,
    ToastAndroid,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows([
               'Loading...'
            ])
        };
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount(){
        this.getMoviesFromApiAsync();
    }
    componentWillUnmount() {
        this.getMoviesFromApiAsync();;
    }
    componentWillMount() {
        this.getMoviesFromApiAsync();;
    }

    getMoviesFromApiAsync() {
    return fetch('https://server-url.com/fetch.php')
        .then((response) => response.json())
        .then((responseJson) => {
            var result = responseJson.result;
            var arr = [];
            for (var i in result){
                console.log(result[i].name+ ' .'+ result[i].phone +' .'+ result[i].address);
                arr.push(result[i].name+ ' .'+ result[i].phone +' .'+ result[i].address);
                arr.push('\n');
            }
            this.setState({
                dataSource: this.ds.cloneWithRows(arr)
            })

        })
        .catch((error) => {
            console.error(error);
        });
}

    render()
    {
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
        );
    }

    deleteUser(name, phone, address){
        console.log(name);
        console.log(phone);
        console.log(address);
        var url = 'http://serverurl.com/delete2.php?name='+name+
            '&phone='+phone+
            '&address='+address;

        var result = fetch(url).then(function(response){
            if (response._bodyInit == 'success') {
                ToastAndroid.show('Employee deleted', ToastAndroid.SHORT);
            }
        }.bind(this));
        this.getMoviesFromApiAsync();
    }


    onPressItem(rowData){
        var objects = rowData.split('.');
        var name = objects[0] + ' ' + objects[1] + ' ' + objects[2];

        Alert.alert(
            "Delete employee?",
            name,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel')},
                {text: 'Yes', onPress: this.deleteUser.bind(this,objects[0], objects[1], objects[2])}
            ]
        )
    }

    renderScene(route, navigator) {
        return (
            <View style={{flex: 1, paddingTop: 100}}>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text onPress={this.onPressItem.bind(this,rowData)}>{rowData}</Text>}
                />
                <Button
                    onPress={this.onPress.bind(this)}
                    title="Add employee"
                    color="#2E64FE"
                    accessibilityLabel="Add employee to the list"
                />
            </View>
        );
    }
    onPress() {
        this.props.navigator.push({
            id: 'PersonPage',
            name: 'Person Page',
        });
    }
}
var NavigationBarRouteMapper = {

    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
                              onPress={() => navigator.parentNavigator.pop()}>
                <Text style={{color: 'white', margin: 10}}>
                    Go back
                </Text>
            </TouchableOpacity>
        );
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return
        (
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'white', margin: 10, fontSize: 16}}>
                    Employee list
                </Text>
            </TouchableOpacity>
        )
    },
};
module.exports = MainPage;
