import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('');
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Menambahkan tugas baru dengan kategori
  const addTask = () => {
    if (task.length > 0 && category.length > 0) {
      setTasks([...tasks, { key: Date.now().toString(), value: task, category, completed: false }]);
      setTask('');
      setCategory('');
    } else {
      Alert.alert("Error", "Please enter both task and category");
    }
  };

  // Menghapus tugas dengan animasi
  const deleteTask = (taskKey) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setTasks(tasks.filter(task => task.key !== taskKey));
      fadeAnim.setValue(1); // Reset animasi untuk tugas lainnya
    });
  };

  // Tandai tugas selesai dengan animasi
  const toggleComplete = (taskKey) => {
    setTasks(tasks.map(task => 
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    ));
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.5, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  // Statistik tugas
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  // Mengelompokkan tugas berdasarkan kategori
  const groupedTasks = tasks.reduce((groups, task) => {
    if (!groups[task.category]) groups[task.category] = [];
    groups[task.category].push(task);
    return groups;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Daftar Tugas Anda</Text>
      <Text style={styles.taskCount}>selesai: {completedTasks} | tersisa: {remainingTasks}</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Icon name="add" size={29} color="#fff" />
        </TouchableOpacity>
      </View>

      {Object.keys(groupedTasks).map(category => (
        <View key={category}>
          <Text style={styles.categoryHeader}>{category}</Text>
          <FlatList
            data={groupedTasks[category]}
            renderItem={({ item }) => (
              <Animated.View style={[styles.taskItem, { opacity: fadeAnim }, item.completed && styles.completedTask]}>
                <TouchableOpacity onPress={() => toggleComplete(item.key)}>
                  <Icon name={item.completed ? "check-circle" : "radio-button-unchecked"} size={24} color="#34a853" />
                </TouchableOpacity>
                <Text style={[styles.taskText, item.completed && styles.completedText]}>
                  {item.value}
                </Text>
                <TouchableOpacity onPress={() => deleteTask(item.key)}>
                  <Icon name="delete" size={24} color="#ff5e57" />
                </TouchableOpacity>
              </Animated.View>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f4e79',
    marginBottom: 10,
    textAlign: 'center',
  },
  taskCount: {
    fontSize: 18,
    color: '#1f4e79',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderColor: '#1f4e79',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: '#34a853',
    padding: 10,
    borderRadius: 8,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f4e79',
    marginVertical: 10,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#1f4e79',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#1f4e79',
    borderWidth: 1,
  },
  completedTask: {
    backgroundColor: '#d3f8e2',
  },
  taskText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

