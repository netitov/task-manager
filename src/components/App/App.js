
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import TaskTable from '../TaskTable/TaskTable';
import Actions from '../Actions/Actions';
import TaskModal from '../TaskModal/TaskModal';
import { dateToInputValue, addDays } from '../../utils/DateFormater';

function App() {

  const [taskModalActive, setTaskModalActive] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [activeTask, setActiveTask] = useState({});

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
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  function saveTask(formData) {
    console.log(formData)
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
    updateLocalStorage(task);
    closeTaskModal();
  }

  function updateLocalStorage(task) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = savedTasks.findIndex(item => item.id === task.id);

    if (index !== -1) {
      savedTasks[index] = task;
    } else {
      savedTasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }

  //set tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    //if there are saved tasks - render them
    if (savedTasks) {
      setTaskList(savedTasks);
    } else {
      //otherwise create task-example
      saveTask({ title: 'Это пример задачи' });
    }

  }, [])

  return (
    <div className='page'>
      <Header />

      <main>
        <div className='page__table-wrapper'>
          <Actions
            openTaskModal={openTaskModal}
          />
          <TaskTable
            tasks={taskList}
            openTaskModal={openTaskModal}
            saveTask={saveTask}
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
