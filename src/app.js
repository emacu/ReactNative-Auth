import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
     firebase.initializeApp({
      apiKey: "AIzaSyDB4U7zDsPbgq2jvkzbZdQ1lPNrIcp1Nz8",
      authDomain: "authentication-53f72.firebaseapp.com",
      databaseURL: "https://authentication-53f72.firebaseio.com",
      storageBucket: "authentication-53f72.appspot.com",
      messagingSenderId: "759341655151"
    });

    firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         this.setState({ loggedIn: true });
       } else {
         this.setState({ loggedIn: false });
       }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <Card>
            <CardSection>
              <Spinner size="large" />
            </CardSection>
          </Card>
        );
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
