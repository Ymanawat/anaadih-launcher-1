import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddTaskProps = {
  onAddTask: (task: string, deadline: string) => void;
  onCancel: () => void;
};

const AddTask = ({ onAddTask, onCancel }: AddTaskProps) => {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = async () => {
    const _deadline = deadline.getTime().toString();
    onAddTask(task, _deadline);
    setTask('');
    setDeadline(new Date());
  };
  

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDeadline = new Date(deadline.getTime());
      newDeadline.setHours(selectedDate.getHours());
      newDeadline.setMinutes(selectedDate.getMinutes());
      setDeadline(newDeadline);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
      <Text>{deadline.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="time"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Addbutton} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign:'center',
    marginBottom:12,
    borderRadius:8,
    height: '60%',
  },
  input: {
    height: 60,
    backgroundColor:'#444444',
    borderRadius: 8,
    padding: 20,
    marginBottom:10,
    minWidth: '100%',
  },
  buttonContainer: {
    marginTop:20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Addbutton: {
    height: 60,
    backgroundColor: '#267DFF',
    padding: 20,
    borderRadius: 8,
    marginBottom:10,
    minWidth: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
  button: {
    height: 60,
    backgroundColor: '#444444',
    padding: 20,
    borderRadius: 8,
    marginBottom:10,
    minWidth: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlignVertical: 'center',
    alignItems: 'center',
  },
});

export default AddTask;