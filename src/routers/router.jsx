import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { RouteConfig } from "./router-config";

export const SpecialAccessRoute = ({ children, special_access }) => {

  // let status = "user is logged in";
  // if (special_access == "user") {
  //   if (status == "user is not logged in") {
  //     return <Navigate to="/login" />;
  //   }
  //   else{
  //     return <Navigate to="/" />;
  //   }
  // }

  return children;
};

const RouteList = () => {
  return (
    <Routes>
      {RouteConfig.map(({ path, element, special_access }, key) => {
        return (
          <Route
            path={path}
            key={key}
            element={
              special_access ? (
                <SpecialAccessRoute special_access={special_access}>{element}</SpecialAccessRoute>
              ) : (
                element
              )
            }
          />
        );
      })}
    </Routes>
  )
}

export default RouteList