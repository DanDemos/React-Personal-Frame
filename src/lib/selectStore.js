import { store } from "../redux/store/configureStore";

export const selectStore = (name) => store.getState()[name];
