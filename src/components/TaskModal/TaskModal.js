import React, { useEffect } from 'react';

function TaskModal({ modalActive, closeModal }) {

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
    function handleOverlayClose(e) {
      if (e.target.classList.contains('task-modal_active')) {
        closeModal();
      }
    }
    document.addEventListener('keyup', handleEscClose);
    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('keyup', handleEscClose);
      document.removeEventListener('click', handleOverlayClose);
    };
  }, []);

  return (
    <div className={`task-modal${modalActive ? ' task-modal_active' : ''}`}>
      <form className='task-modal__form'>
        <div className='form__container'>
          <label className='task-modal__label'>Название задачи
            <div className='task-modal__input' suppressContentEditableWarning={true} contentEditable={true}></div>
          </label>

          <label className='task-modal__label'>Описание
            <div
              suppressContentEditableWarning={true}
              contentEditable={true}
              className='task-modal__input task-modal__text-area'
            >
            </div>
          </label>

          <div className='task-modal__input-box'>
            <input type='date' className='task-modal__date table__date'></input>
            <select className='task-modal__status table__status'>
              <option>Ожидание</option>
              <option>В работе</option>
              <option>Выполнено</option>
            </select>
          </div>

          <div className='task-modal__btn-box'>
            <button type='submit' className='task-modal__btn task-modal__btn-sbt'>Сохранить</button>
            <button type='button' className='task-modal__btn' onClick={closeModal}>Закрыть</button>
          </div>

          <button className='task-modal__close-btn' type='button' onClick={closeModal}>
            <svg width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path fill="#000000" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"/>
            </svg>
          </button>
        </div>

      </form>
    </div>
  )
}

export default TaskModal;
