import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import Store from './store/configStore';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import Dashboard from "./screens/Dashboard";


const App = () => {
  return (
      <Provider store={Store}>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen
                      name="Homescreen"
                      component={HomeScreen}
                  />
                  <Stack.Screen name="Loginscreen" component={LoginScreen} />
                  <Stack.Screen name="Registerscreen" component={RegisterScreen} />
                  <Stack.Screen name="ForgotPasswordscreen" component={ForgotPasswordScreen} />
                  <Stack.Screen name="Dashboard" component={Dashboard} />
              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );
};

export default App;

