import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Task from './DailyTask';

const Workspace = () => {
  return (
    <View style={styles.container}>
        <Task taskName="Task 1" deadline="2023-03-01" isCompleted={false}/>
        <Task taskName="Task 2" deadline="2023-03-02" isCompleted={false}/>
        <Task taskName="Task 3" deadline="2023-03-03" isCompleted={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    padding: 16,
    alignItems: 'flex-end',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical : 16,
  },
  taskName: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },
  deadline: {
    fontSize: 18,
    color: '#fff',
  },
  tickContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginLeft: 8,
  },
  tick: {
    fontSize: 24,
    color: '#333',
  },
});

export default Workspace;
