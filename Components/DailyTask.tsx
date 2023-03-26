import React, {useState}from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

type TaskProps = {
  Task: string;
  deadline: string;
  isCompleted: boolean;
  onDelete: () => void;
};

const DailyTask = ({ Task, deadline, isCompleted, onDelete }: TaskProps) => {
  const [completed, setCompleted] = useState(isCompleted);
  const tickIcon = completed ? require('./task/filled.png') : require('./task/empty.png');

  const handleToggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={[completed && styles.completedTask, styles.Task]}>{Task}</Text>
        <Text style={styles.deadline}>{deadline}</Text>
      </View>
      <TouchableOpacity onPress={handleToggleCompleted}>
        <Image source={tickIcon} style={styles.tickIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <Image source={require('./task/delete.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#444444',
    marginBottom:12,
    borderRadius:8,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    marginRight: 2,
    marginLeft: 24,
    alignItems:'center',
  },
  textContainer: {
    flex: 1,
  },
  Task: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#e5e5e5',
    marginBottom: 4,
  },
  deadline: {
    fontSize: 14,
    color: '#999',
  },
  tickIcon: {
    width: 24,
    height: 24,
    alignItems:'center',
  },
  completedTask: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#e5e5e5',
    marginBottom: 4,
    textDecorationLine: 'line-through',
  }
});

export default DailyTask;
