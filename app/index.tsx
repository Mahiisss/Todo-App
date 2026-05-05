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
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

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

  const saveEdit = () => {
    setTasks(
      tasks.map((item) =>
        item.id === editingId ? { ...item, text: editText } : item
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // ⭐ Date Status (Overdue / Today)
  const getDateStatus = (taskDate: string) => {
    const today = new Date();
    const taskD = new Date(taskDate);

    today.setHours(0, 0, 0, 0);
    taskD.setHours(0, 0, 0, 0);

    if (taskD.getTime() < today.getTime()) return 'overdue';
    if (taskD.getTime() === today.getTime()) return 'today';
    return 'normal';
  };

  const filteredTasks = tasks
    .filter((item) => {
      if (filter === 'completed') return item.completed;
      if (filter === 'pending') return !item.completed;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>

      {/* INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        onSubmitEditing={addTask}
      />

      {/* DATE PICKER */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
      >
        <Text>📅 {date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowPicker(Platform.OS === 'ios');
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* ADD BUTTON */}
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addText}>ADD TASK</Text>
      </TouchableOpacity>

      {/* FILTER */}
      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setFilter('all')}>
          <Text style={styles.filter}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')}>
          <Text style={styles.filter}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('pending')}>
          <Text style={styles.filter}>Pending</Text>
        </TouchableOpacity>
      </View>

      {/* SORT */}
      <TouchableOpacity
        style={styles.sortBtn}
        onPress={() =>
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        }
      >
        <Text style={{ color: 'white' }}>
          Sort: {sortOrder === 'asc' ? 'Oldest' : 'Newest'}
        </Text>
      </TouchableOpacity>

      {/* CLEAR */}
      <TouchableOpacity style={styles.clearBtn} onPress={clearCompleted}>
        <Text style={{ color: 'white' }}>Clear Completed</Text>
      </TouchableOpacity>

      {/* COUNT */}
      <Text style={styles.count}>
        Total: {tasks.length} | Completed:{' '}
        {tasks.filter((t) => t.completed).length}
      </Text>

      {/* LIST */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
        renderItem={({ item }) => {
          const status = getDateStatus(item.date);

          return (
            <View style={styles.taskRow}>
              <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                <View>
                  {editingId === item.id ? (
                    <TextInput
                      value={editText}
                      onChangeText={setEditText}
                      onSubmitEditing={saveEdit}
                      style={styles.input}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.item,
                        item.completed && styles.completed
                      ]}
                    >
                      {item.text}
                    </Text>
                  )}

                  <Text
                    style={[
                      styles.date,
                      status === 'overdue' && { color: 'red' },
                      status === 'today' && { color: 'green' }
                    ]}
                  >
                    📅 {item.date}{' '}
                    {status === 'today'
                      ? '(Today)'
                      : status === 'overdue'
                      ? '(Overdue)'
                      : ''}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingId(item.id);
                    setEditText(item.text);
                  }}
                >
                  <Text style={{ color: 'blue' }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },

  addButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  addText: { color: 'white' },

  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },

  item: { fontSize: 16 },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },

  date: { fontSize: 12 },

  empty: { textAlign: 'center', marginTop: 20 },

  dateButton: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 10
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },

  filter: { fontWeight: 'bold' },

  sortBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },

  clearBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },

  count: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  }
});