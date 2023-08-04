const hasPrefix = (action, prefix) => action.type.startsWith(prefix);
const isPending = (action) => action.type.endsWith("/pending");
const isFulfilled = (action) => action.type.endsWith("/fulfilled");
const isRejected = (action) => action.type.endsWith("/rejected");

export const isPendingAction = (prefix) => (action) => {
  // Note: this cast to any could also be `any` or whatever fits your case best
  return hasPrefix(action, prefix) && isPending(action);
};

export const isRejectedAction = (prefix) => (action) => {
  // Note: this cast to any could also be `any` or whatever fits your case best - like if you had standardized errors and used `rejectWithValue`
  return hasPrefix(action, prefix) && isRejected(action);
};

export const isFulfilledAction = (prefix) => (action) => {
  return hasPrefix(action, prefix) && isFulfilled(action);
};
