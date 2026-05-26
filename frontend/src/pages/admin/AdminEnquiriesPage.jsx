import { ClipboardList } from 'lucide-react';

function AdminEnquiriesPage({ enquiries }) {
  return (
    <section className="admin-section-panel">
      <div className="panel-heading">
        <div>
          <h2>All website enquiries</h2>
          <p>Every contact form submission appears here with name, email, phone, and message.</p>
        </div>
        <ClipboardList />
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Message</th>
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
              </tr>
            )) : (
              <tr><td colSpan="5">No enquiries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminEnquiriesPage;
