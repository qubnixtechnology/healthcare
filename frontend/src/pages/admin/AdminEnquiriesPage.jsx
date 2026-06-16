import { ClipboardList, Edit3, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button.jsx';

const emptyEnquiry = { name: '', email: '', phone: '', status: 'new', message: '' };

function AdminEnquiriesPage({ enquiries, onCreate, onUpdate, onDelete }) {
  const [form, setForm] = useState(emptyEnquiry);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const resetForm = () => {
    setForm(emptyEnquiry);
    setEditingId(null);
    setMessage('');
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) await onUpdate(editingId, form);
      else await onCreate(form);
      resetForm();
      setMessage(editingId ? 'Enquiry updated successfully.' : 'Enquiry added successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editEnquiry = (enquiry) => {
    setEditingId(enquiry.id);
    setForm({
      name: enquiry.name || '',
      email: enquiry.email || '',
      phone: enquiry.phone || '',
      status: enquiry.status || 'new',
      message: enquiry.message || '',
    });
    setMessage('');
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await onDelete(id);
      if (editingId === id) resetForm();
      setMessage('Enquiry deleted successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <div>
          <h2>All website enquiries</h2>
          <p>Create, edit, close, or remove contact form enquiries.</p>
        </div>
        <ClipboardList />
      </div>

      <form className="admin-crud-form" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={(event) => updateField('name', event.target.value)} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required /></label>
        <label>Phone<input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label>
        <label>Status
          <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        <label className="admin-form-wide">Message<textarea rows="3" value={form.message} onChange={(event) => updateField('message', event.target.value)} required /></label>
        <div className="admin-form-actions">
          <Button type="submit">{editingId ? <Edit3 size={17} /> : <Plus size={17} />}{editingId ? 'Update enquiry' : 'Add enquiry'}</Button>
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
              <th>Phone</th>
              <th>Status</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length ? enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td>{enquiry.name}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.phone || '-'}</td>
                <td><span className="admin-status">{enquiry.status}</span></td>
                <td>{enquiry.message}</td>
                <td>
                  <div className="admin-row-actions">
                    <Button type="button" variant="outline" onClick={() => editEnquiry(enquiry)}><Edit3 size={16} />Edit</Button>
                    <Button type="button" variant="outline" className="admin-danger-action" onClick={() => deleteEnquiry(enquiry.id)}><Trash2 size={16} />Delete</Button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6">No enquiries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminEnquiriesPage;
