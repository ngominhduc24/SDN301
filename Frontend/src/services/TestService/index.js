import http from "../index";
const apiTest = "/test";

const getTestApi = () => {
  return http.get(apiTest);
};

const TestService = {
  getTestApi,
};

export default TestService;
