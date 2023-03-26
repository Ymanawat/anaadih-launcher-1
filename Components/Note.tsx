import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface Note {
  title: string;
  content: string;
  date: string;
}

export interface NoteProps {
  note: Note;
}


const Note = ({ note }: NoteProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Text style={styles.date}>{note.date}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444444',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    minWidth : "45%",
    borderRadius: 10,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    color: '#a5a5a5',
    fontSize:12,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: '#e5e5e5',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
  content: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color:'#e5e5e5',
  },
});

export default Note;
