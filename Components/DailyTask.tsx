import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

type TaskProps = {
  title: string;
  deadline: string;
  isCompleted: boolean;
  onDelete: () => void;
};

const Task = ({ title, deadline, isCompleted, onDelete }: TaskProps) => {
  const tickIcon = isCompleted ? require('./task/filled.png') : require('./task/empty.png');

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.deadline}>{deadline}</Text>
      </View>
      <TouchableOpacity onPress={() => {}}>
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
  title: {
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
});

export default Task;
