import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  FlatList,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {setTaskID, setTasks} from '../redux/actions';
import CustomButton from '../utils/CustomButton';
import CheckBox from 'react-native-checkbox';

export default function Done({navigation}) {
  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getTasks();
  // }, []);
  // const getTasks = () => {
  //   AsyncStorage.getItem('Tasks')
  //     .then(tasks => {
  //       const parsedTasks = JSON.parse(tasks);
  //       if (parsedTasks && typeof parsedTasks === 'object') {
  //         dispatch(setTasks(parsedTasks));
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  const deleteTasks = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(err => console.log(err));
  };

  const handleEdit = e => {
    // dispatch(setTaskID(e));
    // navigation.navigate('Tasks');
  };
  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    console.log(newValue);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          // Alert.alert('Success!', 'Task state is changed.');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleEdit(item.ID)}>
            <View style={styles.item_Row}>
              <View
                style={[
                  styles.item_color,
                  {
                    backgroundColor:
                      item.Color === 'red'
                        ? '#f28b82'
                        : item.Color === 'blue'
                        ? '#aecbfa'
                        : item.Color === 'green'
                        ? '#ccff90'
                        : 'white',
                  },
                ]}></View>
              <CheckBox
                checked={item.Done}
                label=""
                onChange={newValue => checkTask(item.ID, !newValue)}
                checkboxStyle={styles.check_Box}
              />
              <View style={styles.item_body}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.Title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.Desc}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteTasks(item.ID)}>
                <FontAwesome5 name="trash" color="red" size={20} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item_Row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },

  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  item_color: {
    height: '100%',
    width: 20,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  check_Box: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
});
