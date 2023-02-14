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
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    width : "45%",
  },
  date: {
    color: '#aaa',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
  content: {
    fontSize: 16,
  },
});

export default Note;
