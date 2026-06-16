import { Clock3, Edit3, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button.jsx';

const emptyOrder = { name: '', email: '', phone: '', status: 'new', message: '' };

function AdminPendingOrdersPage({ pendingOrders, onCreate, onUpdate, onDelete }) {
  const [form, setForm] = useState(emptyOrder);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const resetForm = () => {
    setForm(emptyOrder);
    setEditingId(null);
    setMessage('');
  };

  const approvalLabel = (status) => (status === 'closed' ? 'Approved/Closed' : 'Pending');

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) await onUpdate(editingId, form);
      else await onCreate(form);
      resetForm();
      setMessage(editingId ? 'Pending order updated successfully.' : 'Pending order added successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editOrder = (order) => {
    setEditingId(order.id);
    setForm({
      name: order.name || '',
      email: order.email || '',
      phone: order.phone || '',
      status: order.status || 'new',
      message: order.message || '',
    });
    setMessage('');
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this pending order?')) return;
    try {
      await onDelete(id);
      if (editingId === id) resetForm();
      setMessage('Pending order deleted successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <div>
          <h2>Pending orders</h2>
          <p>Create, edit, approve, close, or delete pending order requests.</p>
        </div>
        <Clock3 />
      </div>

      <form className="admin-crud-form" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={(event) => updateField('name', event.target.value)} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required /></label>
        <label>Phone<input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label>
        <label>Status
          <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Approved/Closed</option>
          </select>
        </label>
        <label className="admin-form-wide">Requirement<textarea rows="3" value={form.message} onChange={(event) => updateField('message', event.target.value)} required /></label>
        <div className="admin-form-actions">
          <Button type="submit">{editingId ? <Edit3 size={17} /> : <Plus size={17} />}{editingId ? 'Update order' : 'Add order'}</Button>
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
              <th>Approval/Reject</th>
              <th>Requirement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.length ? pendingOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone || '-'}</td>
                <td><span className="admin-status">{order.status}</span></td>
                <td><span className="admin-status">{approvalLabel(order.status)}</span></td>
                <td>{order.message}</td>
                <td>
                  <div className="admin-row-actions">
                    <Button type="button" variant="outline" onClick={() => editOrder(order)}><Edit3 size={16} />Edit</Button>
                    <Button type="button" variant="outline" className="admin-danger-action" onClick={() => deleteOrder(order.id)}><Trash2 size={16} />Delete</Button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="7">No pending orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminPendingOrdersPage;
