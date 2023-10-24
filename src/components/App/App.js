
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import TaskTable from '../TaskTable/TaskTable';
import Actions from '../Actions/Actions';
import TaskModal from '../TaskModal/TaskModal';
import { dateToInputValue, addDays } from '../../utils/DateFormater';
import { updateLocalStorage, removeFromLocalStorage } from '../../utils/LocalStorageHandler';
import { compareByField } from '../../utils/Sorter';
import { sendNotification, requestUserPermission } from '../../utils/Notifier';

function App() {

  const [taskModalActive, setTaskModalActive] = useState(false);
  const [fullTaskList, setFullTaskList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [activeTask, setActiveTask] = useState({});
  const [sortedField, setSortedField] = useState({});
  const [completedHidden, setCompletedHidden] = useState(false);

  function openTaskModal(openedTask) {
    setTaskModalActive(true);
    //pass the active task for modal window to prefill the form
    if (openedTask.id) {
      setActiveTask(openedTask);
    } else {
      setActiveTask({});
    }
  }

  function closeTaskModal() {
    setTaskModalActive(false);
    setActiveTask({});
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  function saveTask(formData) {
      //add id to task
    const task = formData.id ? formData : {...formData, id: generateId() };

    //if user didn't select term - use next day
    if (!task.term) {
      task.term = dateToInputValue(addDays(new Date(), 1));
    }
    //if user didn't select title - use default
    if (!task.title) {
      task.title = '(здесь могло быть название задачи)';
    }

    setTaskList((prevState) => {
      const updatedTasks = [...prevState];
      const taskIndex = updatedTasks.findIndex((i) => i.id === task.id);

      //if task exists, replace it with new values
      if (taskIndex !== -1) {
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...task };
      } else {
        //if task new - add it to the list
        updatedTasks.push(task);
      }

      return updatedTasks;
    });
    //updateLocalStorage(task);
    const updatedTaskList = updateLocalStorage(task, 'tasks');
    setFullTaskList(updatedTaskList);
    closeTaskModal();
  }

  function deleteTask(task) {
    setTaskList((prevState) => {
      const updatedTasks = prevState.filter((item) => item.id !== task.id);
      return updatedTasks;
    });
    const updatedTaskList = removeFromLocalStorage(task, 'tasks');
    setFullTaskList(updatedTaskList);
  }

  function sortTable(field) {
    let sortedColumn = sortedField;
    if (!sortedColumn[field]) {
      sortedColumn = { [field]: 'asc' };
    } else {
      sortedColumn = sortedColumn[field] === 'asc' ?  { [field]: 'desc' } :  { [field]: 'asc' };
    }

    const sortedArr = [...taskList].sort(compareByField(field, sortedColumn[field]));

    setTaskList(sortedArr);
    //set sorted field for styling table header
    setSortedField(sortedColumn);
  }

  //show/hide complited tasks
  function toggleCompleted() {
    if (!completedHidden) {
      const filteredTasks = taskList.filter(i => !i.completed);
      setTaskList(filteredTasks);
      setCompletedHidden(true);
    } else {
      setTaskList(fullTaskList);
      setCompletedHidden(false);
    }
  }


  function sendTaskNotification(task, delayMinutes) {
    const deadlineDate = new Date(task.term);

    const notificationTime = new Date(deadlineDate.getTime() - delayMinutes * 60 * 1000);
    const currentTime = new Date();

    //count delay for function call
    const timeDifference = notificationTime - currentTime;

    //send notification in 'delayMinutes' before deadline
    if (timeDifference > 0) {
      setTimeout(() => {
        const notificationTitle = task.title;
        const notificationOptions = {
          body: `Дедлайн через ${delayMinutes} минут`,
        };
        sendNotification(notificationTitle, notificationOptions);
      }, timeDifference);
    }
  }

  //call sendTaskNotification if taskList changed
  useEffect(() => {
    if (taskList.length) {
      taskList.forEach((i) => {
        sendTaskNotification(i, 30);
      })
    }
  }, [taskList])

  //set tasks from local storage and request notification permission
  useEffect(() => {

    //request notification permission
    requestUserPermission();

    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    //if there are saved tasks - render them
    if (savedTasks) {
      setTaskList(savedTasks);
      setFullTaskList(savedTasks);
    } else {
      //otherwise create task-example
      saveTask({
        title: 'Это пример задачи',
        status: 'Ожидание',
        completed: false,
        createAt: new Date()
       });
    }
  }, [])

  return (
    <div className='page'>
      <Header />

      <main>
        <div className='page__table-wrapper'>
          <Actions
            openTaskModal={openTaskModal}
            sortTable={sortTable}
            sortedField={sortedField}
            toggleCompleted={toggleCompleted}
            completedHidden={completedHidden}
            taskList={taskList}
          />
          <TaskTable
            tasks={taskList}
            openTaskModal={openTaskModal}
            saveTask={saveTask}
            deleteTask={deleteTask}
            sortTable={sortTable}
            sortedField={sortedField}
          />
        </div>
      </main>

      <TaskModal
        modalActive={taskModalActive}
        closeModal={closeTaskModal}
        saveTask={saveTask}
        activeTask={activeTask}
      />

    </div>
  );
}

export default App;
