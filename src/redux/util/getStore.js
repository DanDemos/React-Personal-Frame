
import { store } from "../store/configureStore";

export const state = name => store.getState()[name]