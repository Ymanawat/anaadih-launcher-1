import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, PanResponder, TouchableOpacity, Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Workspace from './Components/Workspace';
import Events from './Components/Events-container';
import Notes from './Components/Notes-container';
import Text from './assets/Text';


import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
}

loadFonts();




const Stack = createStackNavigator();

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('Workspace');
  const [currentTime, setCurrentTime] = useState(new Date());
  const contentX = useRef(new Animated.Value(0)).current;
  const [indicatorX] = useState(new Animated.Value(0));


  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
        contentX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 100) {
          setSelectedTab(prevTab => {
            if (prevTab === 'Events') {
              return 'Workspace';
            } else if (prevTab === 'Notes') {
              return 'Events';
            }
            return prevTab;
          });
        } else if (gestureState.dx < -100) {
          setSelectedTab(prevTab => {
            if (prevTab === 'Events') {
              return 'Notes';
            } else if (prevTab === 'Workspace') {
              return 'Events';
            }
            return prevTab;
          });
        }
        Animated.timing(contentX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  useEffect(() => {
    Animated.timing(indicatorX, {
      toValue: selectedTab === 'Workspace' ? 0 : selectedTab === 'Events' ? 1 : 2,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [selectedTab, indicatorX]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const time = currentTime.toLocaleTimeString();
  const date = currentTime.toLocaleDateString();
  const dateTimeString = `${time} ${date}`;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.username}>Hey! </Text>
        <Text style={styles.date}>{dateTimeString}</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
        style={styles.transparentButton}
        onPress={() => setSelectedTab('Workspace')}
        >
          <Text style={selectedTab === 'Workspace' ? styles.tabTitleBold : styles.tabTitle}>Workspace</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={() => setSelectedTab('Events')}
        >
          <Text style={selectedTab === 'Events' ? styles.tabTitleBold : styles.tabTitle}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={() => setSelectedTab('Notes')}
        >
          <Text style={selectedTab === 'Notes' ? styles.tabTitleBold : styles.tabTitle}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={() => {}}
        >
          <Text style={styles.tabTitle1}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activeTabIndicatorLine}>
      <View style={[styles.activeTabIndicator, { left: selectedTab === 'Workspace' ? 0 : (selectedTab === 'Events' ? 120 : 220) }]} />
      </View>


      <Animated.View
        style={[
          styles.contentContainer,
          { transform: [{ translateX: contentX }] },
        ]}
        {...panResponder.panHandlers}
      >
        {selectedTab === 'Workspace' && (<Workspace />)}
        {selectedTab === 'Events' && (<Events />)}
        {selectedTab === 'Notes' && (<Notes />)}
      </Animated.View>
      <View style={styles.drawerContainer}>
        <View>

        </View>
        <Text>App Drawer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  text: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  tabTitle1: {
    fontSize: 24,
    color: "#9A9A9A",
  },
  tabTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: "#9A9A9A",
  },
  tabTitleBold :{
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    textAlign:'center',
    color: "white",
  },
  activeTabIndicatorLine: {
    height: 2,
    backgroundColor: '#9a9a9a',
    width: '100%',
    position: 'relative',
  },
  activeTabIndicator: {
    height: 3,
    backgroundColor: '#267DFF',
    width: '33.33%',
    position: 'absolute',
    
  },
  container: {
    backgroundColor:"#1b1b1b",
    flex: 1,
    paddingVertical : 16,
    paddingHorizontal : 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    
    width: '100%',
    alignItems : 'flex-start',
    justifyContent: 'space-between',
    marginTop : 40,
    marginBottom : 10,
    padding: 10,
  },
  username: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color : "#e5e5e5"
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color : "#e5e5e5"
  },
  tabsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContainer: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 10,
  },
  transparentButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default App;
