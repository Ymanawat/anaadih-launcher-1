import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DailyTask from './DailyTask';
import AddTask from './Add comp/AddTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Font from 'expo-font';

interface Task {
  isCompleted: boolean;
  task: string;
  deadline: string;
}

const Workspace = () => {

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
      });
    };

    loadFonts();
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = async (task: string, deadline: string) => {
    const newTask = { task, deadline, isCompleted: false };
    setTasks([...tasks, newTask]);
    setShowAddTask(false); // hide the AddTask component after adding a task
    
    try {
      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      setShowAddTask(false); // hide the AddTask component after adding a task
    } catch (error) {
      console.log(error);
    }
  };
  
  const completeTask = async (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = true;
    setTasks(updatedTasks);

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem('tasks');
        if (tasks) {
          setTasks(JSON.parse(tasks));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, []);

  return (
    
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
      {!showAddTask && tasks.map((task, index) => (
        <DailyTask
          key={index}
          Task={String(task.task)}
          deadline={String(task.deadline)}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    marginTop:16,
    minWidth: '100%'
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
