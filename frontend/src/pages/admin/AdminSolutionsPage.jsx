import { Edit3, PackageSearch, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/Button.jsx';

const emptySolution = {
  name: '',
  category: '',
  price: 0,
  rating: 4.5,
  stock: 0,
  image: '',
  description: '',
};

function AdminSolutionsPage({ solutions, onCreate, onUpdate, onDelete }) {
  const [form, setForm] = useState(emptySolution);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const resetForm = () => {
    setForm(emptySolution);
    setEditingId(null);
    setMessage('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    try {
      if (editingId) await onUpdate(editingId, form);
      else await onCreate(form);
      resetForm();
      setMessage(editingId ? 'Solution updated successfully.' : 'Solution added successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editSolution = (solution) => {
    setEditingId(solution.id);
    setForm({
      name: solution.name || '',
      category: solution.category || '',
      price: solution.price || 0,
      rating: solution.rating || 4.5,
      stock: solution.stock || 0,
      image: solution.image || '',
      description: solution.description || '',
    });
    setMessage('');
  };

  const deleteSolution = async (id) => {
    if (!window.confirm('Delete this solution?')) return;
    try {
      await onDelete(id);
      if (editingId === id) resetForm();
      setMessage('Solution deleted successfully.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <div>
          <h2>Solution catalogue</h2>
          <p>Add, edit, and delete products shown on the website.</p>
        </div>
        <PackageSearch />
      </div>

      <form className="admin-crud-form" onSubmit={submit}>
        <label>Name<input value={form.name} onChange={(event) => updateField('name', event.target.value)} required /></label>
        <label>Category<input value={form.category} onChange={(event) => updateField('category', event.target.value)} required /></label>
        <label>Price<input type="number" min="0" step="0.01" value={form.price} onChange={(event) => updateField('price', event.target.value)} /></label>
        <label>Rating<input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(event) => updateField('rating', event.target.value)} /></label>
        <label>Capacity<input type="number" min="0" value={form.stock} onChange={(event) => updateField('stock', event.target.value)} /></label>
        <label className="admin-form-wide">Image URL<input value={form.image} onChange={(event) => updateField('image', event.target.value)} required /></label>
        <label className="admin-form-wide">Description<textarea rows="3" value={form.description} onChange={(event) => updateField('description', event.target.value)} required /></label>
        <div className="admin-form-actions">
          <Button type="submit">{editingId ? <Edit3 size={17} /> : <Plus size={17} />}{editingId ? 'Update solution' : 'Add solution'}</Button>
          {editingId && <Button type="button" variant="outline" onClick={resetForm}><X size={17} />Cancel</Button>}
        </div>
      </form>
      {message && <p className="form-message">{message}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Solution</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Capacity</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {solutions.length ? solutions.map((solution) => (
              <tr key={solution.id}>
                <td>{solution.name}</td>
                <td>{solution.category}</td>
                <td>{solution.rating}</td>
                <td>{solution.stock}</td>
                <td>{solution.description}</td>
                <td>
                  <div className="admin-row-actions">
                    <Button type="button" variant="outline" onClick={() => editSolution(solution)}><Edit3 size={16} />Edit</Button>
                    <Button type="button" variant="outline" className="admin-danger-action" onClick={() => deleteSolution(solution.id)}><Trash2 size={16} />Delete</Button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6">No solutions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminSolutionsPage;
