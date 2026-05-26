import { Users } from 'lucide-react';

function AdminUsersPage({ users }) {
  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <h2>Users</h2>
        <Users />
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className="admin-status">{user.role}</span></td>
                <td>{user.created_at}</td>
              </tr>
            )) : (
              <tr><td colSpan="4">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminUsersPage;
