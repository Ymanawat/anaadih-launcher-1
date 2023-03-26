import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddNoteProps = {
  onAddNote: (title: string, content: string, date: string) => void;
  onCancel: () => void;
};

const AddNote = ({ onAddNote, onCancel }: AddNoteProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());

  const handleAddNote = async () => {
    try {
      const _date = date.getDate().toString();
      onAddNote(title, content, _date);
      setTitle('');
      setContent('');
      setDate(new Date());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
      />
      <Text style={styles.dateText}>{date.toLocaleString()}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addNoteButton} onPress={handleAddNote}>
          <Text style={styles.buttonText}>Add Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
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
    padding: 4,
    marginTop:4,
    borderRadius:8,
    height: '60%',
  },
  input: {
    height: 60,
    backgroundColor: '#444444',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    minWidth: '100%',
  },
  dateText: {
    color: '#555555',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addNoteButton: {
    height: 60,
    backgroundColor: '#267DFF',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: '100%',
    textAlign: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    height: 60,
    backgroundColor: '#444444',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
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

export default AddNote;
