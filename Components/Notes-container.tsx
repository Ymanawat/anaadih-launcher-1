import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import Note, { NoteProps } from "./Note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddNote from "./Add comp/AddNote";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

const NotesGrid = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem("notes");
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotes();
  }, []);

  const [showAddNote, setShowAddNote] = useState(false);

  const addNote = async (title: string, content: string, date: string) => {
    const newNote: Note = {
      id: Date.now(),
      title: title,
      content: content,
      date: date,
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.log(error);
    }
    setShowAddNote(false);
  };

  const deleteNote = (noteToDelete: Note) => {
    const updatedNotes = notes.filter(
      (note) => note.title !== noteToDelete.title
    );

    try {
      AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (noteToDelete: Note) => {
    Alert.alert(
      "Delete Note",
      `Are you sure you want to delete "${noteToDelete.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteNote(noteToDelete),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity onLongPress={() => confirmDelete(item)}>
      <Note note={item} />
    </TouchableOpacity>
  );

  const notesWithIds = notes.map((note, index) => ({ ...note, id: index }));

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={styles.container}
    >
      {showAddNote ? (
        <AddNote onAddNote={addNote} onCancel={() => setShowAddNote(false)} />
      ) : (
        <>
          <FlatList
            data={notesWithIds}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={styles.flatList}
          />
          <TouchableOpacity onPress={() => setShowAddNote(true)}>
            <Text style={styles.addButton}>+ Add Note</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    marginTop: 16,
    minWidth: "100%",
    minHeight: "100%",
  },
  flatList: {
    minWidth: '100%'
  },
  addButton: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    margin: 16,
  },
});

export default NotesGrid;
