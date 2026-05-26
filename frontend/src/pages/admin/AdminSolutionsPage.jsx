import { PackageSearch } from 'lucide-react';

function AdminSolutionsPage({ solutions }) {
  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <h2>Solution catalogue</h2>
        <PackageSearch />
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Solution</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Capacity</th>
              <th>Description</th>
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
              </tr>
            )) : (
              <tr><td colSpan="5">No solutions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminSolutionsPage;
