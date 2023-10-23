import React from 'react';

function Actions({ openTaskModal }) {
  return (
    <div className='actions'>
      <button type='button' className='actions__btn' onClick={openTaskModal}>Создать задачу</button>
      <button type='button' className='actions__btn'>Скрыть выполненные</button>
      <button type='button' className='actions__btn'>Сначала новые</button>
    </div>
  )
}

export default Actions;
