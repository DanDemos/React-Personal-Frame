import { dispatchStore } from "./dispatchStore";
import localStorage from "redux-persist/es/storage";
import { useLocation } from "react-router-dom";
import { ProfilePopupSlice } from "../helper/customSlice";
import { selectStore } from "./selectStore";

const LogoutToHomeUrls = [
  "/checkout",
  "add-to-card"
]

const LogoutToLoginUrls = [
  "/profile"
]

export const Logout = () => {
  const token = selectStore("AccessToken");
  dispatchStore(ProfilePopupSlice.actions.setShowMbProfile(false));
  localStorage.removeItem("persist:root");
  setTimeout(() => {
    window.location.replace("/login")
  }, 1000);
  if (LogoutToHomeUrls.some(url => window.location.href.includes(url))) {
    window.location.replace("/")
  }
  else if(LogoutToLoginUrls.some(url => window.location.href.includes(url))){
    window.location.replace("/login")
  }
  else if (token) {
    window.location.reload();
  }
  return null
};

export default Logout