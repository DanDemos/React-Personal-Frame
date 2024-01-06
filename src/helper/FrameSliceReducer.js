export const FrameSliceReducer = {
  clearSlice: (state, action) => {
    state = {};
    return state;
  },
  clearSliceElement: (state, action) => {
    console.log(action?.payload, "sheet");
    state[action?.payload] = {};
    return state;
  },
  myReducer: (state, action) => {
    return state;
  },
};

export default FrameSliceReducer;
