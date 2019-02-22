import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import ToDoApp from "./src/ToDoApp";
import store from './src/store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Button title="Login" onPress={() => this.props.navigation.navigate('Dashboard')} />
        <Button title="Sign Up" onPress={() => alert('button pressed')} />
      </View>
    );
  }
}

class ToDoScreen extends Component {
  render() {
    return (
      <Provider store={store}>
        <ToDoApp/>
      </Provider>
    );
  }
}

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Coming Soon!</Text>
      </View>
    );
  }
}

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Coming Soon!</Text>
      </View>
    );
  }
}

const ToDoList = createStackNavigator(
  {
    ToDoScreen: {
      screen: ToDoScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'To-Do-List',
          headerLeft: (
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
          )
        };
      }
    }
  }
);

const Profile = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Profile',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});

const Settings = createStackNavigator({
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Settings',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        )
      };
    }
  }
});

const DashboardTabNavigator = createMaterialTopTabNavigator(
  {
    ToDoList,
    Profile,
    Settings
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
        ),
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Menu: {
    screen: DashboardStackNavigator
  },
  ToDoList: {
    screen: ToDoList
  },
  Profile: {
    screen: Profile
  },
  Settings: {
    screen: Settings
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});