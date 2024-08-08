import { createApiThunk } from "../../redux/reducers/reducer";
import { dispatchStore } from "../../lib/dispatchStore";
import { selectStore } from "../../lib/selectStore";
import { endpoints } from "./endpoints";
import storage from "redux-persist/lib/storage";
import { GenerateID } from "../../lib/GenerateID";
import { token_endpoint } from "../../helper/setAccessToken";
import { loadingSlice } from "../../redux/reducers/reducer";
import callAxios from "./axios";
import { token_key } from "../../helper/setAccessToken";

const callApi = (apiName) => {
  let uniqueAPI_id = null;
  const [apiGroup, endpointKey] = apiName.split("/");

  const endpoint = endpoints?.[apiGroup]?.[endpointKey];
  if (endpoint == undefined) {
    throw new Error(
      "Cannot find endpoint. Please Check endpoints.js and endpoint passed in callApi function"
    );
  }

  const thunkName = `${apiGroup}/${endpointKey}`;

  const [token_endpointGroup, token_endpointKey] = token_endpoint.split("/");

  let segment = null;
  let headers = null;
  let body = null;
  let keyparameter = null;
  let params = null;
  let group_name = null;
  let missing_AccessToken = false;

  const apiCall = {
    // withSegment: (segmentData) => {
    //   segment = segmentData;
    //   return apiCall;
    // },
    withKeyParameter: (keyparameterData) => {
      for (const key in keyparameterData) {
        if (typeof keyparameterData[key] == 'number' || typeof keyparameterData[key] == 'string' || Array.isArray(keyparameterData[key]) == false) {
          if (keyparameter == null) {
            keyparameter = {}
          }
          keyparameter[key] = keyparameterData[key]
        }
      }
      return apiCall;
    },
    withParam: (paramData) => {
      params = paramData;
      return apiCall;
    },
    withHeaders: (headersData) => {
      headers = headersData;
      return apiCall;
    },
    withBody: (bodyData) => {
      body = bodyData;
      return apiCall;
    },
    loadingGroup: (groupName) => {
      group_name = groupName;
      return apiCall;
    },
    addAccessToken: () => {
      if (
        (endpoint?.token === "require" || endpoint?.token === "optional") &&
        selectStore("AccessToken").length > 0
      ) {
        headers = headers
          ? {
            ...headers,
            [token_key]: selectStore("AccessToken"),
          }
          : { [token_key]: selectStore("AccessToken") };
      } else if (endpoint?.token === "require") {
        missing_AccessToken = true;
        throw new Error(`User needs to login. ${endpointKey} API call was terminated.`)
      }
      return apiCall;
    },
    execute: async () => {
      apiCall.addAccessToken()
      if (missing_AccessToken) return;
      const payload = {
        endpoint,
        segment,
        keyparameter,
        params,
        headers,
        body,
      };

      uniqueAPI_id = GenerateID();
      const loadingData = { uniqueAPI_id, group_name };

      dispatchStore(loadingSlice.actions.setLoading(loadingData));
      const res = await callAxios(payload);
      dispatchStore(loadingSlice.actions.setLoading(loadingData));
      return res;
    },
    executeDispatch: async () => {
      apiCall.addAccessToken()
      if (missing_AccessToken) return;
      const payload = {
        endpoint,
        segment,
        keyparameter,
        params,
        headers,
        body,
      };
      uniqueAPI_id = GenerateID();
      let response
      const loadingData = { uniqueAPI_id, group_name };

      const getLocalStorage = async (apiGroup, endpointKey) => {
        const localstorage = await storage.getItem("persist:root");
        endpointKey = endpointKey;
        if (localstorage) {
          const parsedLocalStorage = JSON.parse(localstorage);
          const check_data = parsedLocalStorage[apiGroup];
          let endpointData;
          if (check_data) {
            endpointData = JSON.parse(check_data)?.[endpointKey];
          }

          if (endpointData && endpointData.data.expireDate) {
            const currentDate = new Date();
            const expireDate = new Date(endpointData.expireDate);
            if (currentDate > expireDate) {
              console.log(currentDate > expireDate, "persist is expired");
              const asyncThunk = createApiThunk(thunkName, payload);
              response = await dispatchStore(asyncThunk());
            } else {
              console.log(
                currentDate > expireDate,
                "persist is not expired yet"
              );
            }
          } else {
            const asyncThunk = createApiThunk(thunkName, payload, loadingData);
            response = await dispatchStore(asyncThunk());
          }
        } else {
          const asyncThunk = createApiThunk(thunkName, payload, loadingData);
          response = await dispatchStore(asyncThunk());

        }
        return uniqueAPI_id;
      };

      await getLocalStorage(apiGroup, endpointKey);
      return response?.payload;
    },
  };

  return apiCall;
};

export default callApi;
