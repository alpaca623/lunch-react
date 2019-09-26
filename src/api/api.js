import Axios from "axios";

const instance = Axios.create({
  baseURL: `http://192.168.11.150:3002`
});

export const requestData = (option, data) => {
  console.log(option, data);
  const { method, location } = option;
  return instance[method](location, data);
};

export const requestGet = async (param) => {
  return await instance.get(param);
}

export const requestPost = async (params, data) => {
  return await instance.post(params, data);
}