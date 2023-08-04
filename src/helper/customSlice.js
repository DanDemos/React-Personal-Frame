import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {

}
export const yourSlice = createSlice({
  name: 'yourSlice',
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, action) => {
      return state
    },
  },
});

export default {
  yourSlice,
}