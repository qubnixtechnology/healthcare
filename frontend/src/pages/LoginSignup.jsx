import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function LoginSignup() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);
  const { isAuthenticated, isAdmin, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) setMessage(location.state.message);
    return () => clearTimeout(timerRef.current);
  }, [location.state]);

  if (isAuthenticated) return <Navigate to={isAdmin ? '/dashboard' : '/'} replace />;

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage('');
    setForm({ name: '', email: '', password: '' });
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const handler = mode === 'login' ? api.login : api.signup;
      const data = await handler(form);

      if (mode === 'signup') {
        setMessage('Account created successfully. Please login now.');
        setMode('login');
        setForm({ name: '', email: form.email, password: '' });
        return;
      }

      const accountRole = data.user?.role === 'admin' ? 'Admin' : 'User';
      login(data.user);
      setMessage(`Successfully login as ${accountRole}.`);
      timerRef.current = setTimeout(() => {
        navigate(data.user?.role === 'admin' ? '/dashboard' : '/', { replace: true });
      }, 900);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-visual" aria-hidden="true"></div>
      <form className="auth-form compact-auth-form" onSubmit={submit}>
        <div className="auth-heading">
          <p className="eyebrow">{mode === 'login' ? 'Secure access' : 'New account'}</p>
          <h1>{mode === 'login' ? 'Login to your account' : 'Create account'}</h1>
          <p>{mode === 'login' ? 'Enter your email and password. Your role is detected from the database.' : 'Create a user account.'}</p>
        </div>

        {mode === 'signup' && <label>Name<input name="name" value={form.name} onChange={update} required /></label>}
        <label>Email<input type="email" name="email" value={form.email} onChange={update} required /></label>
        <label>Password<input type="password" name="password" value={form.password} onChange={update} required minLength="6" /></label>

        <Button type="submit">{mode === 'login' ? 'Login' : 'Create account'}</Button>
        {message && <p className="form-message">{message}</p>}

        <div className="auth-switch-note">
          {mode === 'login' ? (
            <p>Don't have an account? <button type="button" onClick={() => switchMode('signup')}>Create account</button></p>
          ) : (
            <p>Already have an account? <button type="button" onClick={() => switchMode('login')}>Login</button></p>
          )}
        </div>
      </form>
    </section>
  );
}

export default LoginSignup;
