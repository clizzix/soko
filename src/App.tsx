import { BrowserRouter, Routes, Route } from 'react-router';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import ActivityDetails from './pages/ActivityDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import CreateActivity from './pages/CreateActivity';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="activity/:id" element={<ActivityDetails />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="user" element={<Profile />} />
                        <Route path="user/favorites" element={<Favorites />} />
                        <Route path="activity/create" element={<CreateActivity />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
