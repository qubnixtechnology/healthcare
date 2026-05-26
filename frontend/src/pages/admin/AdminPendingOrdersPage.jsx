import { Clock3 } from 'lucide-react';

function AdminPendingOrdersPage({ pendingOrders }) {
  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <h2>Pending orders</h2>
        <Clock3 />
      </div>
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
            </tr>
          </thead>
          <tbody>
            {pendingOrders.length ? pendingOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phone || '-'}</td>
                <td><span className="admin-status">{order.status}</span></td>
                <td><span className="admin-status">Pending</span></td>
                <td>{order.message}</td>
              </tr>
            )) : (
              <tr><td colSpan="6">No pending orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminPendingOrdersPage;
