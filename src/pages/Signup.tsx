import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signupUser } from '../api';
import { signupSchema, type SignupFormData } from '../schemas';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<SignupFormData>({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Partial<SignupFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: { target: HTMLInputElement }) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: { preventDefault(): void }) => {
        e.preventDefault();

        const result = signupSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors: Partial<SignupFormData> = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as keyof SignupFormData;
                fieldErrors[field] = issue.message;
            }
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);
        try {
            await signupUser(result.data);
            navigate('/login');
        } catch {
            toast.error('Invalid Input');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="fieldset bg-neutral-400 border-neutral rounded-box w-xs border p-4 text-black mx-auto mt-20"
        >
            <legend className="fieldset-legend text-black">Signup</legend>
            <label htmlFor="userName" className="label">
                Username
            </label>
            <input
                type="userName"
                name="userName"
                className="input bg-white"
                placeholder="Username"
                value={form.userName}
                onChange={handleChange}
            />
            {errors.userName && (
                <p className="text-red-600 text-sm">{errors.userName}</p>
            )}
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

            <label className="label">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                className="input bg-white"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
            />
            {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
            )}

            <button
                className="btn btn-base mt-4"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Signing up...' : 'Signup'}
            </button>
        </form>
    );
};

export default Signup;
