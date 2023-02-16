import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type EventProps = {
    date: string;
    month: string,
    title: string;
    deadline: string;
    tag:string;
};

const Event = ({ date, month, title, deadline, tag }: EventProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.deadline}>{deadline}</Text>
      </View>
      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{tag}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight:16,
    backgroundColor:'#444444',
    marginBottom:12,
    borderRadius:8,
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor:'#e5e5e5',
    padding: 16,
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8,
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  month: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#e5e5e5',
  },
  deadline: {
    fontSize: 14,
    color:'#e5e5e5',
  },
  tagContainer: {
    backgroundColor: '#267DFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tag: {
    fontSize: 12,
    color: '#e5e5e5',
  },
});

export default Event;
