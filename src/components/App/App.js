
import { useState } from 'react';
import Header from '../Header/Header';
import TaskTable from '../TaskTable/TaskTable';
import Actions from '../Actions/Actions';
import TaskModal from '../TaskModal/TaskModal';

function App() {

  const [taskModalActive, setTaskModalActive] = useState(false);

  function openTaskModal() {
    setTaskModalActive(true);
  }

  function closeTaskModal() {
    setTaskModalActive(false);
  }

  return (
    <div className='page'>
      <Header />

      <main>
        <div className='page__table-wrapper'>
          <Actions
            openTaskModal={openTaskModal}
          />
          <TaskTable />
        </div>
      </main>

      <TaskModal
        modalActive={taskModalActive}
        closeModal={closeTaskModal}
      />

    </div>
  );
}

export default App;
