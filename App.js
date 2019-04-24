import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { 
  createAppContainer, 
  createBottomTabNavigator, 
  createMaterialTopTabNavigator, 
  createStackNavigator 
} from 'react-navigation'
import { purple, white } from './utils/colors'
import { Fontawesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}



const tabs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <Fontawesome name='plus-square' size={30} color={tintColor} />
    },
  },
}

const options = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgb(0, 0, 0, 0.24)',
      shadowOffsetL: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Nav = createAppContainer(Platform.OS === 'ios' 
                                  ? createBottomTabNavigator(tabs, options) 
                                  : createMaterialTopTabNavigator(tabs, options))

const StackNavigator = createStackNavigator({
  Home: {
    screen: Nav,
    navigationOptions: {
      header: null
    } 
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const MainNavigator = createAppContainer(StackNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
