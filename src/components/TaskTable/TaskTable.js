import React, { useState } from 'react';

function TaskTable() {

  const [title, setTitle] = useState('Сделать что-то важное');

  function handleChange(e) {
    console.log(e.target.value)
    setTitle(e.target.value);
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
        <tr className='table__row'>
          <td className='table__data'>
            <input type='checkbox' className='table__check-input' id='check'></input>
            <label className='table__check-label' htmlFor='check'></label>
          </td>
          <td className='table__data' >
            <p
              contentEditable={true}
              className='table__task-title'
              onChange={handleChange}
              suppressContentEditableWarning={true}
            >
              {title}
            </p>
          </td>
          <td className='table__data table__data-btns'>
            <div>
              <button type='button' className='table__acn-btn table__acn-btn-edit'></button>
              <button type='button' className='table__acn-btn table__acn-btn-delete'></button>
            </div>
          </td>
          <td className='table__data'>
            <input type='date' className='table__date'></input>
          </td>
          <td className='table__data'>
            <select className='table__status'>
              <option>Ожидание</option>
              <option>В работе</option>
              <option>Выполнено</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default TaskTable;
