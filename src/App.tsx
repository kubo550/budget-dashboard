import {createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider} from "react-router-dom";
import {dashboardLoader, Dashboard, dashboardAction} from "./pages/Dashboard";
import {ErrorPage} from "./pages/ErrorPage";
import {Main, mainLoader} from "./layout/Main";
import {removeItem} from "./helpers/fetchData";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const logOut = async () => {

    await removeItem('username');
    await removeItem('budgets');
    await removeItem('expenses');
    toast.success('You have been logged out');
    return redirect('/')
};


const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Main/>}
                       loader={mainLoader}>
                    <Route path="logout" action={logOut} element={<p>loading...</p>}/>
                    <Route path="/" element={<Dashboard/>}
                           loader={dashboardLoader}
                           action={dashboardAction}
                           errorElement={<ErrorPage/>}
                    />
                </Route>
                <Route path="*" element={<ErrorPage/>}/>
            </>
        )
    );

    return (
        <div className={'app'}>
            <RouterProvider router={router}/>
            <ToastContainer/>
        </div>
    );
}

export default App;