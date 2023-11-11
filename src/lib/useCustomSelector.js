import { useSelector } from "react-redux";
// export const useCustomSelector = key => useSelector(state => state[key])


export const useCustomSelector = (path) => {
  return useSelector((state) => {
    const pathParts = path.split('.');
    let result = state;

    for (const part of pathParts) {
      if (result && result.hasOwnProperty(part)) {
        result = result[part];
      } else {
        return undefined;
      }
    }

    return result;
  });
}