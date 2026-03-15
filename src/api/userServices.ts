export const loginUser = async (email: string, password: string) => {
    const port = import.meta.env.VITE_PORT || 'http://localhost:8080';
    try {
        const response = await fetch(`${port}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            console.log('Login successful!', data.user);
        } else {
            console.error('Login failed:', data.error);
        }
    } catch (err) {
        console.error('Network error:', err);
    }
};
