import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Note, { NoteProps } from './Note';

const notes: NoteProps[] = [
  {
    date: '2022-02-14',
    title: 'My first note',
    content: "This is my first note and You know what i'm gonna create another one then another one",
  },
  {
    date: '2022-02-15',
    title: 'My second note',
    content: "You know what i'm gonna create another one then another one till i got the three dots showings there is more",
  },  
  {
    date: '2022-02-15',
    title: 'My Third note',
    content: "Just to check if my grid is properly working or not",
  },
];

const NotesGrid = () => {
  const renderItem = ({ item }: { item: NoteProps }) => <Note {...item} />;

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.date}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    flex: 1,
    alignItems:'stretch',
  },
});

export default NotesGrid;
