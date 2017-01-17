'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Navigator,
  ToastAndroid,
  Alert,
  TouchableOpacity
} from 'react-native';

class PersonPage extends Component {
  constructor(props) {
    super(props);
    console.log('EmployeeManager - Add employee');
    this.state = {
      name: '',
      phone: '',
      address:''
    }
  }

  render() {
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
  add(){
    var name = this.state.name;
    var phone = this.state.phone;
    var address = this.state.address;
    console.log(name);
    console.log(phone);
    console.log(address);

    if (this.state.name == '' || this.state.phone == '' || this.state.address == '') {
      Alert.alert(
          'Empty field(s)!',
          'Please complete all fields!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
      )
    }
    else{
      var url = 'http://server-url.com/insert2.php?name='+this.state.name+
          '&phone='+this.state.phone+
          '&address='+this.state.address;

      var result = fetch(url).then(function(response){
        if (response._bodyInit == 'success') {
          ToastAndroid.show('Employee added', ToastAndroid.SHORT);
        }
      }.bind(this));
    }



  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput placeholder='Name'
                   style={{width:200, textAlign: 'center'}}
                   onChangeText={(text) => this.setState({...this.state, name: text})}/>

        <TextInput placeholder='Phone'
                   style={{width:200, textAlign: 'center'}}
                   onChangeText={(text) => this.setState({...this.state, phone: text})}/>

        <TextInput placeholder='Address'
                   style={{width:200, textAlign: 'center'}}
                   onChangeText={(text) => this.setState({...this.state, address: text})}/>
        <Button
            onPress={this.add.bind(this)}
            title="Add employee"
            color="#2E64FE"
            accessibilityLabel="Add employee to the list"
        />
      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10}}>
          Go back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, nextState) {
    return null;
  },
  Title(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Add employee
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = PersonPage;
