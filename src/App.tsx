import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import ActivityDetails from './pages/ActivityDetails';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreateActivity from './pages/CreateActivity';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="activity/:id" element={<ActivityDetails />} />
                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/user" element={<Outlet />}>
                            <Route index element={<Profile />} />
                            <Route path="/favorites" element={<Favorites />} />
                        </Route>
                        <Route
                            path="activity/create"
                            element={<CreateActivity />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
