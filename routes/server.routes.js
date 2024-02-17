import {
  register,
  login,
  logout,
  refresh,
  dashboard,
} from "../controller/auth/auth.server.controller.js";

import {
  resendOtp,
  verifyOtp,
} from "../controller/auth/otp.server.controller.js";

import {
  downloadClientConfig,
  downloadHostConfig,
  // ExeDownload,
  downloadHost,
  downloadClient
} from "../controller/file/file.controller.js";
// import{
//   getIPAddress,
  
// }from "../controller/file/file.controller.js";

import { createSession } from "../controller/session/session.server.controller.js";


export const routes = (router) => {
  router.post("/0auth/register", register);
  router.post("/0auth/login", login);
  router.post("/0auth/logout", logout);
  router.post("/0auth/refresh", refresh);
  router.post("/0auth/verifyOtp", verifyOtp);
  router.post("/0auth/resendOtp", resendOtp);
  router.post("/0auth/dashboard", dashboard);
  router.post("/0session/createSess", createSession);
  router.post("/0file/downloadHost", downloadHostConfig);
  router.post("/0file/downloadClient", downloadClientConfig);
  router.get("/0file/host", downloadHost);
  router.get("/0file/client", downloadClient);
};
