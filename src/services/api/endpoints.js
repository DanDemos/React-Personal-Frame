import { res_modifiers_config } from "../../helper/res_modifiers_config";

// Define the API URLs for different environments
export const API_URLs = {
  production: import.meta.env.VITE_PRODUCTION_ENDPOINT,
  development: import.meta.env.VITE_DEVELOP_ENDPOINT,
};

export const endpoints = Object.freeze({
  auth: {
    signIn: {
      method: "get",
      endpoint: "api/auth/{:userid}/token",
      res_modifier: res_modifiers_config.getAccessToken,
      token: "optional", // require, optional
      // expire_in: 10
    },
  },
  others: {
    otherIn: {
      method: "get",
      endpoint: "api/auth/token",
    },
    faceBookSignIn: {
      method: "get",
      endpoint: "api/auth/facebook",
    },
  },
  persistSlice: {},
});
