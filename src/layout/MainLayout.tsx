import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-200">
            {' '}
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Header />
            <div className="w-full pb-20">
                <Outlet />
            </div>
            <Navbar />
        </div>
    );
};

export default MainLayout;
