import { loginUser } from '../api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const { token, user } = await loginUser(data);
            login(user, token);
            navigate('/');
        } catch {
            toast.error('Invalid email or password');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="fieldset bg-neutral-400 border-base-300 rounded-box w-xs border p-4 text-black"
        >
            <legend className="fieldset-legend text-black">Login</legend>

            <label className="label">Email</label>
            <input
                type="email"
                className="input bg-white"
                placeholder="Email"
                {...register('email')}
            />
            {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}

            <label className="label">Password</label>
            <input
                type="password"
                className="input bg-white"
                placeholder="Password"
                {...register('password')}
            />
            {errors.password && (
                <p className="text-red-600 text-sm">
                    {errors.password.message}
                </p>
            )}

            <button
                className="btn btn-base mt-4"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
};

export default Login;
