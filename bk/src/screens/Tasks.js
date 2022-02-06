import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {setTasks} from '../redux/actions';
import CheckBox from 'react-native-check-box';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Tasks({navigation}) {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [color, setColor] = useState('');

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
        };

        const index = tasks.findIndex(task => task.ID == taskID);

        let newTask = [];
        if (index > -1) {
          newTask = [...tasks];
          newTask[index] = Task;
        } else {
          newTask = [...tasks, Task];
        }

        AsyncStorage.setItem('Tasks', JSON.stringify(newTask))
          .then(() => {
            dispatch(setTasks(newTask));
            Alert.alert('Success!', 'Task saved successfully.');
            navigation.goBack();
          })
          .catch(error => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        value={title}
        style={styles.input}
        placeholder="Title"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={desc}
        style={styles.input}
        placeholder="Description"
        multiline
        onChangeText={value => setDesc(value)}
      />
      <View style={styles.color_bar}>
        <TouchableOpacity
          style={styles.color_white}
          onPress={() => setColor('white')}>
          {color === 'white' ? (
            <FontAwesome5 name="check" color="black" size={30} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_red}
          onPress={() => setColor('red')}>
          {color === 'red' ? (
            <FontAwesome5 name="check" color="black" size={30} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_blue}
          onPress={() => setColor('blue')}>
          {color === 'blue' ? (
            <FontAwesome5 name="check" color="black" size={30} />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_green}
          onPress={() => setColor('green')}>
          {color === 'green' ? (
            <FontAwesome5 name="check" color="black" size={30} />
          ) : null}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CheckBox
          isChecked={done}
          onClick={() => setDone(!done)}
          checkBoxColor="green"
          checkedCheckBoxColor="green"
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text
          style={{
            marginLeft: 8,
            fontSize: 20,
          }}>
          Done
        </Text>
      </View>
      <CustomButton
        title="Add Tasks"
        color="#1eb900"
        style={{width: '100%'}}
        onPressFunction={setTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 5,
    paddingHorizontal: 10,
  },
  color_bar: {
    width: '100%',
    height: 50,
    marginHorizontal: 2,
    borderColor: '#555555',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#5555',
    flexDirection: 'row',
  },
  color_white: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  color_red: {
    flex: 1,
    backgroundColor: '#f28b82',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: '#ccff90',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
