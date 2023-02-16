import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Task from './DailyTask';

const Workspace = () => {
  return (
    <View style={styles.container}>
        <Task title="Task 1" deadline="2023-03-01" isCompleted={false} onDelete={function (): void {
        throw new Error('Function not implemented.');
      } }/>
        <Task title="Task 2" deadline="2023-03-02" isCompleted={false} onDelete={function (): void {
        throw new Error('Function not implemented.');
      } }/>
        <Task title="Task 3" deadline="2023-03-03" isCompleted={true} onDelete={function (): void {
        throw new Error('Function not implemented.');
      } }/>
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

export default Workspace;
