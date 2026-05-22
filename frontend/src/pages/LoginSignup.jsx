import { useState } from 'react';
import { LockKeyhole, UserPlus } from 'lucide-react';
import Button from '../components/Button.jsx';
import { api } from '../services/api.js';

function LoginSignup() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      const handler = mode === 'login' ? api.login : api.signup;
      const data = await handler(form);
      setMessage(data.message || 'Success');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-visual" aria-hidden="true"></div>
      <form className="auth-form" onSubmit={submit}>
        <div className="mode-switch" role="tablist" aria-label="Authentication mode">
          <Button variant="unstyled" className={mode === 'login' ? 'active-chip' : ''} onClick={() => setMode('login')}>
            <LockKeyhole size={16} /> Login
          </Button>
          <Button variant="unstyled" className={mode === 'signup' ? 'active-chip' : ''} onClick={() => setMode('signup')}>
            <UserPlus size={16} /> Signup
          </Button>
        </div>
        <h1>{mode === 'login' ? 'Welcome back' : 'Create customer account'}</h1>
        {mode === 'signup' && <label>Name<input name="name" value={form.name} onChange={update} required /></label>}
        <label>Email<input type="email" name="email" value={form.email} onChange={update} required /></label>
        <label>Password<input type="password" name="password" value={form.password} onChange={update} required minLength="6" /></label>
        <Button type="submit">{mode === 'login' ? 'Login' : 'Signup'}</Button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

export default LoginSignup;
