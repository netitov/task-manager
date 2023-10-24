import React from 'react';

function Actions({ openTaskModal, sortTable, sortedField, toggleCompleted, completedHidden, taskList }) {

  function handleFilter() {
    if (taskList.find(i => i.completed) || completedHidden) {
      toggleCompleted();
    }
  }

  return (
    <div className='actions'>
      <button type='button' className='actions__btn' onClick={openTaskModal}>Создать задачу</button>
      <button
        type='button'
        className={`actions__btn${!taskList.find(i => i.completed) && !completedHidden ? ' actions__btn_inactive' : ''}`}
        onClick={handleFilter}
      >
        {!completedHidden ? 'Скрыть выполненные' : 'Показать выполненные'}
      </button>
      <button
        type='button'
        className='actions__btn'
        onClick={() => sortTable('createAt')}
      >
        {sortedField['createAt'] === 'asc' ? 'Сначала старые' : 'Сначала новые'}
      </button>
    </div>
  )
}

export default Actions;
