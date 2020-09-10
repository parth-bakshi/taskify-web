// const baseURL = "https://taskify-api.herokuapp.com";
const baseURL = "http://localhost:8000";
const devUrl = "https://taskify-api.herokuapp.com"

export const apiURLs = {
  login: () => `${devUrl}/user/login`,
  getUser: () => `${devUrl}/user`,
  getTasks: () => `${devUrl}/task/get-all-tasks`,
  toggleTask: () => `${devUrl}/task/toggle-task-status`,
  deleteTask: () => `${devUrl}/task/delete-task`,
  createTask: () => `${devUrl}/task/create`,
  createCategory: () => `${devUrl}/user/create/category`,
};
