const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('timeManagementData');
  return data ? JSON.parse(data) : [];
};

const setDataToLocalStorage = (data) => {
  localStorage.setItem('timeManagementData', JSON.stringify(data));
};

export const getAllTasks = () => {
  return getDataFromLocalStorage();
};

export const addTask = (task) => {
  const data = getDataFromLocalStorage();
  data.push(task);
  setDataToLocalStorage(data);
};

export const editTask = (taskId, updatedTask) => {
  const data = getDataFromLocalStorage();
  const index = data.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedTask };
    setDataToLocalStorage(data);
  }
};

export const deleteTask = (taskId) => {
  const data = getDataFromLocalStorage();
  const filteredData = data.filter((task) => task.id !== taskId);
  setDataToLocalStorage(filteredData);
};
