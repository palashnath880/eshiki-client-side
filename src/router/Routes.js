import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../layout/Main';
import Courses from '../Pages/Courses/Courses';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import SingleCourse from '../components/SingleCourse/SingleCourse';
import AuthenticationRoute from './AuthenticationRoute';
import PrivateRoute from './PrivateRoute';
import Cart from '../Pages/Cart/Cart';
import AllCourse from '../components/AllCourse/AllCourse';

const Routes = ({ children }) => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Main />,
            children: [
                {
                    path: '/',
                    element: <PrivateRoute><Home /></PrivateRoute>
                },
                {
                    path: '/login',
                    element: <AuthenticationRoute><Login /></AuthenticationRoute>
                },
                {
                    path: '/signup',
                    element: <AuthenticationRoute><SignUp /></AuthenticationRoute>
                },
                {
                    path: '/courses',
                    element: <Courses />,
                    children: [
                        {
                            path: '/courses',
                            element: <AllCourse />
                        },
                        {
                            path: '/courses/:id',
                            element: <SingleCourse />,
                            loader: ({ params }) => fetch(`https://eshiki-server-side.vercel.app/courses/${params.id}`),
                        }
                    ]
                },
                {
                    path: '/cart',
                    element: <Cart />
                }
            ]
        }
    ]);
    return (
        <RouterProvider router={router}>
            {children}
        </RouterProvider>
    );
}

export default Routes;
