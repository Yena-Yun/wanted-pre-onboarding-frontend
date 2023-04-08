import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Login, Register, Todo } from 'pages';
import {
  AuthLayout,
  HomeLayout,
  ProtectedLayout,
} from 'smart-components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route element={<HomeLayout />}>
          <Route path='/' element={<Navigate replace to='/signin' />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path='/todo' element={<Todo />} />
        </Route>
      </Route>
      <Route path='/*' element={<Navigate to='/' />} />
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
