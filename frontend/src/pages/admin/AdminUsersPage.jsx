import { Edit3, Plus, Trash2, Users, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button.jsx';

const emptyUser = { name: '', email: '', password: '', role: 'user' };

function AdminUsersPage({ users, onCreate, onUpdate, onDelete }) {
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const resetForm = () => {
    setForm(emptyUser);
    setEditingId(null);
    setMessage('');
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) await onUpdate(editingId, form);
      else await onCreate(form);
      resetForm();
      setMessage(editingId ? 'User updated successfully.' : 'User added successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editUser = (user) => {
    setEditingId(user.id);
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'user',
    });
    setMessage('');
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await onDelete(id);
      if (editingId === id) resetForm();
      setMessage('User deleted successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <div>
          <h2>Users</h2>
          <p>Create users/admins, update roles, reset passwords, or delete accounts.</p>
        </div>
        <Users />
      </div>

      <form className="admin-crud-form" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={(event) => updateField('name', event.target.value)} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(event) => updateField('password', event.target.value)} required={!editingId} placeholder={editingId ? 'Leave blank to keep current password' : ''} /></label>
        <label>Role
          <select value={form.role} onChange={(event) => updateField('role', event.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <div className="admin-form-actions">
          <Button type="submit">{editingId ? <Edit3 size={17} /> : <Plus size={17} />}{editingId ? 'Update user' : 'Add user'}</Button>
          {editingId && <Button type="button" variant="outline" onClick={resetForm}><X size={17} />Cancel</Button>}
        </div>
      </form>
      {message && <p className="form-message">{message}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className="admin-status">{user.role}</span></td>
                <td>{user.created_at}</td>
                <td>
                  <div className="admin-row-actions">
                    <Button type="button" variant="outline" onClick={() => editUser(user)}><Edit3 size={16} />Edit</Button>
                    <Button type="button" variant="outline" className="admin-danger-action" onClick={() => deleteUser(user.id)}><Trash2 size={16} />Delete</Button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminUsersPage;
