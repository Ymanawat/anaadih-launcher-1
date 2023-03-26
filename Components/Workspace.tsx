import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DailyTask from './DailyTask';
import AddTask from './Add comp/AddTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Workspace = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  interface Task {
    task: string;
    deadline: string;
  }

  const addTask = (task: string, deadline: string) => {
    setTasks([...tasks, { task, deadline }]);
    setShowAddTask(false); // hide the AddTask component after adding a task
    
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    // Save the tasks whenever they change
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.error(e);
      }
    };
    saveTasks();
  }, [tasks]);

  useEffect(() => {
    // Load the saved tasks when the component mounts
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      {!showAddTask && tasks.map((task, index) => (
        <DailyTask
          key={index}
          Task={task.task}
          deadline={task.deadline}
          isCompleted={false}
          onDelete={() => removeTask(index)}
        />
      ))}
      {showAddTask ? (
        <AddTask
          onAddTask={addTask}
          onCancel={() => setShowAddTask(false)} // hide the AddTask component on cancel
        />
      ) : (
        <TouchableOpacity onPress={() => setShowAddTask(true)}>
          <Text style={styles.addButton}>+ Add Task</Text>
        </TouchableOpacity>
      )}
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
  addButton: {
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Workspace;
