import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type AddEventProps = {
  onAddEvent: (date: string, month: string, title: string, time: string, tag: string) => void;
  onCancel: () => void;
};

const AddEvent = ({ onAddEvent, onCancel }: AddEventProps) => {
  const [eventName, setEventName] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTag, setEventTag] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddEvent = () => {
    const date = deadline.getDate().toString();
    const month = (deadline.getMonth() + 1).toString();
    const time = startTime + ' - ' + endTime;
    onAddEvent(date, month, eventName, time, eventTag);
    setEventName('');
    setStartTime('');
    setEndTime('');
    setEventTag('');
    setDeadline(new Date());
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{`${deadline.getDate()}/${deadline.getMonth() + 1}`}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Start Time - End Time"
        value={`${startTime} - ${endTime}`}
        onChangeText={(text) => {
          const [newStartTime, newEndTime] = text.split('-').map((str) => str.trim());
          setStartTime(newStartTime);
          setEndTime(newEndTime);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Tag"
        value={eventTag}
        onChangeText={setEventTag}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Addbutton} onPress={handleAddEvent}>
          <Text style={styles.buttonText}>Add Event</Text>
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
    textAlign:'center',
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

export default AddEvent;