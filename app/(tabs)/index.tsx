import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  date: string;
};

export default function Index() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const saveTasks = async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.log(e);
    }
  };

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('tasks');
      if (stored) setTasks(JSON.parse(stored));
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = () => {
    if (task.trim() === '') return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      date: date.toDateString()
    };

    setTasks([...tasks, newTask]);
    setTask('');
    Keyboard.dismiss();
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />

      {/* Date Picker Button */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>
          📅 {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios'); 
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addText}>ADD TASK</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Add one!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <View>
                <Text
                  style={[
                    styles.item,
                    item.completed && styles.completed
                  ]}
                >
                  {item.text}
                </Text>
                <Text style={styles.taskDate}>
                  📅 {item.date}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  dateButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center'
  },
  dateText: {
    color: '#333'
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    elevation: 1
  },
  item: {
    fontSize: 16
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  taskDate: {
    fontSize: 12,
    color: 'gray'
  },
  delete: {
    color: 'red',
    fontWeight: 'bold'
  },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    color: 'gray'
  }
});