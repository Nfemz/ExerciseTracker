import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import logger from 'redux-logger';

import {loginUser, registerUser} from './requests';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {reducer} from './redux/reducers';
import {UserInfo} from './types/user.types';
import {setUser} from './redux/actions';

const reduxStore = createStore(reducer, applyMiddleware(logger));

const App = () => {
  return (
    <Provider store={reduxStore}>
      <ConnectedLogin />
    </Provider>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setUser: (userInfo: UserInfo) => dispatch(setUser(userInfo)),
});

const Login = () => {
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState('Password');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text>Login screen</Text>
            <TextInput
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              title="Login"
              onPress={async () => await loginUser(email, password)}
            />
            <Button
              title="Register"
              onPress={async () => await registerUser(email, password)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const ConnectedLogin = connect(null, mapDispatchToProps)(Login);

export default App;
