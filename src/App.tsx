import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { Todo } from 'pages/Todo';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HomeLayout } from 'smart-components/HomeLayout';
import { ProtectedLayout } from 'smart-components/ProtectedLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<HomeLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path='/todo' element={<Todo />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <div className='content'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
