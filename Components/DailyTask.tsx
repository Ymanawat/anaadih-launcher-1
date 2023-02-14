import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  taskName: string;
  deadline: string;
  isCompleted: boolean;
}

const Task: React.FC<Props> = ({ taskName, deadline, isCompleted }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={styles.taskName}>{taskName}</Text>
      <Text style={styles.deadline}>{deadline}</Text>
      {isCompleted && (
        <Text style={styles.checkMark}>✓</Text>
      )}
      {
        !isCompleted && <Text style={styles.checkMark}>🔘</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor : '#454545'
  },
  taskName: {
    fontSize: 18,
    flex: 1,
  },
  deadline: {
    fontSize: 18,
    marginRight: 10,
  },
  checkMark: {
    fontSize: 18,
  },
});

export default Task;
