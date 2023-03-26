import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, ScrollView } from "react-native";
import Event from "./Event";
import AddEvent from "./Add comp/AddEvent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { Text } from "react-native";

interface Event {
  date: string;
  month: string;
  title: string;
  deadline: string;
  tag: string;
}

const Events = () => {
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      });
    };

    const loadEvents = async () => {
      try {
        const events = await AsyncStorage.getItem("Events");
        if (events !== null) {
          setEvents(JSON.parse(events));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadFonts();
    loadEvents();
  }, []);

  const [events, setEvents] = useState<Event[]>([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [eventIndexToDelete, setEventIndexToDelete] = useState(-1);

  const addEvent = async (
    date: string,
    month: string,
    title: string,
    deadline: string,
    tag: string
  ) => {
    const newEvent = { date, month, title, deadline, tag };
    setEvents([...events, newEvent]);
    setShowAddEvent(false); // hide the AddEvent component after adding a Event

    try {
      const updatedEvents = [...events, newEvent];
      await AsyncStorage.setItem("Events", JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (eventToDelete: Event) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);

    try {
      await AsyncStorage.setItem('Events', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = (eventToDelete: Event) => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete ${eventToDelete.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteEvent(eventToDelete),
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      {events && events.length > 0 ? (
        events.map((event) => (
          <TouchableOpacity
            key={`${event.date}-${event.month}-${event.title}`}
            onLongPress={() => confirmDelete(event)}
          >
            <Event
              date={String(event.date)}
              month={String(event.month)}
              title={String(event.title)}
              deadline={String(event.deadline)}
              tag={String(event.tag)}
            />
          </TouchableOpacity>
        ))
      ) : (
        <Text>No events found</Text>
      )}

      {showAddEvent ? (
        <AddEvent
          onAddEvent={addEvent}
          onCancel={() => setShowAddEvent(false)} // hide the AddEvent component on cancel
        />
      ) : (
        <TouchableOpacity onPress={() => setShowAddEvent(true)}>
          <Text style={styles.addButton}>+ Add Event</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    marginTop: 16,
    alignItems: "flex-end",
  },
  addButton: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    margin: 16,
  },
});

export default Events;
