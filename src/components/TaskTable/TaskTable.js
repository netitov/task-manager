import React from 'react';

function TaskTable({ tasks, openTaskModal, saveTask }) {

  function handleChange(e, i) {
    const name = e.target.name || e.target.getAttribute('name');
    let value;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
      //update status when task is completed via checkbox
      const newStatus = value ? 'Выполнено' : 'В работе';
      saveTask({ ...i, [name]: value, status: newStatus });

    } else if (name === 'status') {
      value = e.target.value;
      //update checkbox when status is changed
      const completeStatus = value === 'Выполнено' ? true : false;
      saveTask({ ...i, [name]: value, completed: completeStatus });

    } else {
      value = e.target.value || e.target.textContent;
      saveTask({ ...i, [name]: value });
    }
  }

  function getStatusStyle(status) {
    if (status === 'Выполнено') {
      return ' table__status_completed';
    } else if (status === 'В работе') {
      return ' table__status_progress';
    } else {
      return ''
    }
  }


  return (
    <table className='table'>
      <thead>
        <tr className='table__head-row'>
          <th className='table__header table__header-check'></th>
          <th className='table__header'>Задача</th>
          <th className='table__header'></th>
          <th className='table__header'>Срок</th>
          <th className='table__header'>Статус</th>
        </tr>
      </thead>

      <tbody className='table__body'>

        {tasks.length ? tasks.map((i, index) => (
          <tr className={`table__row${i.completed ? ' table__row_completed' : ''}`} key={index}>
            <td className='table__data'>
              <input
                type='checkbox'
                className='table__check-input'
                name='completed'
                onChange={(e) => handleChange(e, i)}
                id={i.id}
                checked={i.completed}
              />
              <label className='table__check-label' htmlFor={i.id} title='Выполнить'></label>
            </td>
            <td className='table__data' >
              <p
                contentEditable={true}
                className='table__task-title'
                name='title'
                onBlur={(e) => handleChange(e, i)}
                suppressContentEditableWarning={true}
              >
                {i.title}
              </p>
            </td>
            <td className='table__data table__data-btns'>
              <div>
                <button
                  type='button'
                  className='table__acn-btn table__acn-btn-edit'
                  title='Редактировать задачу'
                  onClick={() => openTaskModal(i)}
                >
                </button>
                <button
                  type='button'
                  className='table__acn-btn table__acn-btn-delete'
                  title='Удалить задачу'
                >
                </button>
              </div>
            </td>
            <td className='table__data'>
              <input
                type='datetime-local'
                className='table__date'
                value={i.term}
                onChange={(e) => handleChange(e, i)}
                name='term'
              />
            </td>
            <td className='table__data'>
              <select
                className={`table__status${getStatusStyle(i.status)}`}
                value={i.status}
                onChange={(e) => handleChange(e, i)}
                name='status'
              >
                <option>Ожидание</option>
                <option>В работе</option>
                <option>Выполнено</option>
              </select>
            </td>
          </tr>
        )) : null}
      </tbody>
    </table>
  )
}

export default TaskTable;
