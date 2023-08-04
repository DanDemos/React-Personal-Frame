import { useSelector } from "react-redux";

const LoadingComponent = ({ loadingGroup, loadingDesign, children }) => {
  const selectedData = useSelector(state => state.loading[loadingGroup]);

  return (
    selectedData ? (loadingDesign || <h1>It is Loading! Baka!</h1>) : children
  );
};

export default LoadingComponent;
