import React from 'react';
import { View, StyleSheet } from 'react-native';
import Event from './Event';


const Events = () => {
  return (
    <View style={styles.container}>
      <Event
          date="16"
          month="Feb"
          title="Event 1"
          deadline="20 Feb"
          tag="Work"
      />
      <Event
          date="16"
          month="Feb"
          title="Event 1"
          deadline="20 Feb"
          tag="Work"
      />
      <Event
          date="16"
          month="Feb"
          title="Event 1"
          deadline="20 Feb"
          tag="Work"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    marginTop:16,
    alignItems: 'flex-end',
  },
  
});

export default Events;
