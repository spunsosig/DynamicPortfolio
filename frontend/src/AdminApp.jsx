import { useState } from 'react'
import AdminLogin from './components/Admin/AdminLogin.jsx';
import AdminPanel from './components/Admin/AdminPanel.jsx';

function AdminApp() {

    const [isAuthenticated, setIsAuthenticated] = useState(true)    

    return (
        <div className='min-h-screen bg-[#0b263a]'>
            {!isAuthenticated && <AdminLogin onSuccess={() => setIsAuthenticated(true)} />}
            {isAuthenticated && <AdminPanel />}
        </div>
    );
}

export default AdminApp;