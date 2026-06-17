import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import Appointments from '../pages/Appointments';
import Treatments from '../pages/Treatments';
import Settings from '../pages/Settings';

import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/patients"
                    element={
                        <PrivateRoute>
                            <Patients />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/appointments"
                    element={
                        <PrivateRoute>
                            <Appointments />
                        </PrivateRoute>
                    }
                />

                <Route
    path="/treatments"
    element={
        <PrivateRoute>
            <Treatments />
        </PrivateRoute>
    }
/>

                <Route
    path="/settings"
    element={
        <PrivateRoute>
            <Settings />
        </PrivateRoute>
    }
/>

            </Routes>

        </BrowserRouter>

    );

}