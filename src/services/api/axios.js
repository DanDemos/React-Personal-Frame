import axios from "axios";
import { API_URLs } from "./endpoints";

// Determine the base URL based on the current environment
const baseUrl =
  API_URLs[
  window.location.hostname === "localhost" ? "development" : "production"
  ];

function splitStringWithParams(inputString) {
  const regex = /(\{:[a-zA-Z]+\})/g; // Regular expression to match the {:something} pattern
  const splitArr = inputString.split(regex);

  return splitArr.filter(Boolean); // Filter out empty strings from the result
}

// Function to make the API call using Axios
const callAxios = async (payload) => {
  // Create a config object with the URL and method
  const config = {
    method: payload.endpoint.method,
  };
  if (payload.segment) {
    config.url = `${baseUrl}/${payload.endpoint.endpoint}/${payload.segment}`;
  } else {
    config.url = `${baseUrl}/${payload.endpoint.endpoint}`;
  }

  try {
    if ((/(\{:[a-zA-Z]+\})/g).test(config.url)) {
      if (payload.keyparameter) {
        try {
          config.url = replacePlaceholders(splitStringWithParams(config.url), payload?.keyparameter).join('')
        } catch (error) {
          console.error(error.message);
        }
      }
      else {
        throw new Error(`Invalid API call: You are using a KeyParameter in ${config.url}, but the withKeyParameter chain function is not used when calling callApi().`);
      }
    }
  }
  catch (error) {
    console.error(error.message);
  }

  // Conditionally assign params if provided
  if (payload.params) {
    config.params = payload.params;
  }

  // Conditionally assign headers if provided
  if (payload.headers) {
    config.headers = payload.headers;
  }

  // Conditionally assign body if provided
  if (payload.body) {
    config.data = payload.body;
  }

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // console.log(error.response.status);
        // console.log(error.response.data);
        throw new Error(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // console.log(error.request);
        throw new Error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error:', error.message);
        throw new Error("Error occurred while making the request.");
      }
    });

  function replacePlaceholders(splitArr, obj) {
    try {
      const replacedArr = splitArr.map(item => {
        const match = item.match(/\{:(\w+)\}/); // Use regex to extract the key from {:key}
        if (match) {
          const key = match[1];
          if (!obj.hasOwnProperty(key)) {
            throw new Error(`${key} is missing when calling api ${baseUrl}/${payload.endpoint.endpoint}`);
          }
          else if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
            throw new Error(`Value of ${key} is ${obj?.key} when calling api ${baseUrl}/${payload.endpoint.endpoint}`);
          }
          return obj[key];
        }
        return item;
      });
      return replacedArr;
    }
    catch (error) {
      console.error(error);
    }
  }
};

export default callAxios;
