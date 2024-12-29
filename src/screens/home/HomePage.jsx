import { Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <h1>Welcome to the Home Page!</h1>
      <Link to="/login">Go to login page</Link>
    </>
  )
}

export default HomePage;