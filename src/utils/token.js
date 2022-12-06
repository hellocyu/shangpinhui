//对外暴露
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

//清除本地token
export const removeToken = () => {
  return localStorage.removeItem("TOKEN");
};
