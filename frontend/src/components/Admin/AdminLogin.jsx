import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import api from '../../utils/api';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Token verification before mount
    useEffect(() => {
        const verifyExistingToken = async () => {
            const token = sessionStorage.getItem('adminToken');
            if (!token) return;

            try {
                await api.post('/api/admin/verify');
                navigate('/admin');
            } catch (error) {
                sessionStorage.removeItem('adminToken');
            }
        };

        verifyExistingToken();
    }, [navigate]);

    const inputStyle =
        "w-full p-3 mb-6 rounded-xl bg-[#111827] border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-gray-400";
    
    const buttonStyle = `w-full bg-purple-600 hover:bg-purple-700 transition rounded-xl font-semibold py-3 text-white ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
    }`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/api/admin/login', credentials);
            sessionStorage.setItem('adminToken', response.data.token);
            toast.success('Login successful!');
            navigate('/admin');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-login-container flex flex-col items-center justify-center min-h-screen bg-[#0b263a]">
            <h1 className="text-white text-5xl pb-10">Admin Login</h1>
            <form onSubmit={handleSubmit} className="contact-form w-96">
                <div>
                    <input
                        className={inputStyle}
                        placeholder="Username"
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <input
                        className={inputStyle}
                        placeholder="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        autoComplete="new-password"
                    />
                </div>
                <button 
                    className={buttonStyle} 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <Loader className="animate-spin mr-2" size={16} />
                            Logging in...
                        </span>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;