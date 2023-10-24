export function updateLocalStorage(task, item) {
  const savedTasks = JSON.parse(localStorage.getItem(item)) || [];
  const index = savedTasks.findIndex(item => item.id === task.id);

  if (index !== -1) {
    savedTasks[index] = task;
  } else {
    savedTasks.push(task);
  }
  localStorage.setItem(item, JSON.stringify(savedTasks));

  return savedTasks;
}

export function removeFromLocalStorage(task, item) {
  const savedTasks = JSON.parse(localStorage.getItem(item)) || [];
  const updatedTasks = savedTasks.filter((item) => item.id !== task.id);
  localStorage.setItem(item, JSON.stringify(updatedTasks));

  return updatedTasks;
}
