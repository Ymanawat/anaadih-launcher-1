import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export type NoteProps = {
    date: string;
    title: string;
    content: string;
  };
  
const Note = ({ date, title, content }: NoteProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444444',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    width : "45%",
    borderRadius: 10,
  },
  date: {
    fontFamily: 'Poppins-Regular',
    color: '#a5a5a5',
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
