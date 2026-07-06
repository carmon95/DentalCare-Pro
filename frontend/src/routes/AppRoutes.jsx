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
import Payments from '../pages/Payments';
import ClinicalHistories from '../pages/ClinicalHistories';
import PatientHistory from '../pages/PatientHistory';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Activation from '../pages/license/Activation';

import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
    path="/activation"
    element={<Activation />}
                />

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
    path="/payments"
    element={
        <PrivateRoute>
            <Payments />
        </PrivateRoute>
    }
/>

<Route
    path="/clinical-histories"
    element={
        <PrivateRoute>
            <ClinicalHistories />
        </PrivateRoute>
    }
/>

<Route
    path="/patient-history/:id"
    element={
        <PrivateRoute>
            <PatientHistory />
        </PrivateRoute>
    }
/>

    <Route
    path="/reports"
    element={<Reports />}
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