import React, { useState } from 'react';

function TaskTable({ tasks }) {

  const [formData, setFormData] = useState({
    status: 'Ожидание'
  });

  function handeFormChange(e) {
    let value = e.target.value || e.currentTarget.textContent;
    const name = e.target.name || e.currentTarget.getAttribute('name');
    setFormData({...formData, [name]: value })
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
          <tr className='table__row' key={index}>
            <td className='table__data'>
              <input type='checkbox' className='table__check-input' id={i.id} checked={i.done}></input>
              <label className='table__check-label' htmlFor={i.id}></label>
            </td>
            <td className='table__data' >
              <p
                contentEditable={true}
                className='table__task-title'
                onBlur={handeFormChange}
                suppressContentEditableWarning={true}
              >
                {i.title}
              </p>
            </td>
            <td className='table__data table__data-btns'>
              <div>
                <button type='button' className='table__acn-btn table__acn-btn-edit'></button>
                <button type='button' className='table__acn-btn table__acn-btn-delete'></button>
              </div>
            </td>
            <td className='table__data'>
              <input type='datetime-local' className='table__date' value={i.term} onChange={handeFormChange}></input>
            </td>
            <td className='table__data'>
              <select className='table__status' value={i.status} onChange={handeFormChange}>
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
