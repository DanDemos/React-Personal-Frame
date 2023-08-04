import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import callApi from '../../services/api/apiClient';
import { useSelector } from 'react-redux';
import LoadingComponent from '../../components/loading/LoadingComponent';
// import MyComponent from ''

const signIn_data = {
  login: '09989002021',
  password: '123',
};

const LoginPage = () => {
  const [loadingID_arr, setloadingID_arr] = useState([]);
  let b = {
    userid: "uid_112",
    row: 2,
    olala: ["hae","awef","aewfla",]
  };
  let hello
  async function login() {
    callApi('auth/signIn').withHeaders(signIn_data).withKeyParameter(b).loadingGroup(1).executeDispatch();
    // callApi('auth/signIn').withHeaders(signIn_data).loadingGroup('g').execute();
    // callApi('auth/signIn').withHeaders(signIn_data).loadingGroup('g').execute();
    // callApi('auth/signIn').withHeaders(signIn_data).execute().then((res) => { setloadingID_arr(res) });
    // const e = callApi('auth/signIn').withHeaders(signIn_data).loadingGroup('g').executeDispatch();
  }
  function login2() {
    callApi('auth/signIn').withHeaders(signIn_data).loadingGroup('g').execute();
    callApi('auth/signIn').withHeaders(signIn_data).loadingGroup('g').execute();
    callApi('auth/signIn').withHeaders(signIn_data).loadingGroup('g').execute();
    callApi('auth/signIn').withHeaders(signIn_data).loadingGroup('g').execute();
  }

  return (
    <>
      {
        <>
          <LoadingComponent loadingGroup={1}><h1>Shazam!! I'm fully charged</h1></LoadingComponent>
          <LoadingComponent loadingGroup={"g"} loadingDesign={<h1>ooooooooooo</h1>}></LoadingComponent>
          <h1>{loadingID_arr.user_id}</h1>
        </>
      }
      <button onClick={login}>call api</button><br />
      <button onClick={login2}>call api2</button><br />
      <Link to="/">Go to home page</Link>
    </>
  )
}

export default LoginPage;