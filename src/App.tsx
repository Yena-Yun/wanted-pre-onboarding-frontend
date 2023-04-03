import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { Todo } from 'pages/Todo';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Register />,
  },
  {
    path: '/todo',
    element: <Todo />,
  },
]);

function App() {
  return (
    <div className='content'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
