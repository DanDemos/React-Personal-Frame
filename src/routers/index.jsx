import { BrowserRouter } from 'react-router-dom';
import RouteList from './router';

const AppLayout = () => {
  return (
      <BrowserRouter>
          <RouteList/>
      </BrowserRouter>
  )
}

export default AppLayout;