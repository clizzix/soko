import { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '../api';
import { loginSchema, type LoginFormData } from '../schemas';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: { target: HTMLInputElement }) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: { preventDefault(): void }) => {
        e.preventDefault();

        const result = loginSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: Partial<LoginFormData> = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof LoginFormData;
                fieldErrors[field] = issue.message;
            }
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        try {
            const { token, user } = await loginUser(result.data);
            login(user, token);
            navigate('/');
        } catch {
            toast.error('Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="fieldset bg-neutral-400 border-base-300 rounded-box w-xs border p-4 text-black"
        >
            <legend className="fieldset-legend text-black">Login</legend>

            <label className="label">Email</label>
            <input
                type="email"
                name="email"
                className="input bg-white"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />
            {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
            )}

            <label className="label">Password</label>
            <input
                type="password"
                name="password"
                className="input bg-white"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />
            {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
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
