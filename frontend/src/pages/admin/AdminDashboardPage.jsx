import { BarChart3, Clock3, ClipboardList, Package, Users } from 'lucide-react';
import { company } from '../../data/siteData.js';

function AdminStatCard({ icon: Icon, value, label, onClick }) {
  return (
    <button className="stat-block admin-stat-card" type="button" onClick={onClick}>
      <span className="admin-stat-icon"><Icon size={24} /></span>
      <strong>{value}</strong>
      <span>{label}</span>
    </button>
  );
}

function AdminDashboardPage({ stats, onNavigate }) {
  return (
    <>
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Admin dashboard</p>
          <h1>Track pharma-tech enquiries, healthcare partners, and field activity.</h1>
          <p>
            A practical admin surface for {company.name} to monitor solution demand,
            clinic and hospital enquiries, user accounts, and follow-ups from one place.
          </p>
        </div>
        <div className="dashboard-status-card">
          <Clock3 />
          <span>Today focus</span>
          <strong>{stats.enquiries} enquiries</strong>
          <p>Review open requests and convert interested healthcare partners into active engagements.</p>
        </div>
      </div>

      <div className="stats-row dashboard-stats">
        <AdminStatCard icon={Package} value={stats.solutions} label="Solutions" onClick={() => onNavigate('solutions')} />
        <AdminStatCard icon={ClipboardList} value={stats.enquiries} label="Enquiries" onClick={() => onNavigate('enquiries')} />
        <AdminStatCard icon={Users} value={stats.users} label="Users" onClick={() => onNavigate('users')} />
        <AdminStatCard icon={Clock3} value={stats.pendingOrders} label="Pending orders" onClick={() => onNavigate('pendingOrders')} />
      </div>

      <div className="dashboard-grid dashboard-insight-grid">
        <div className="dashboard-panel"><Package /><h2>Solution requests</h2><p>QR authentication, GPS tracking, pharma software, reporting, and verified medicine reach.</p></div>
        <div className="dashboard-panel"><Users /><h2>Account roles</h2><p>User and admin accounts are separated so protected dashboard access stays role-based.</p></div>
        <div className="dashboard-panel"><BarChart3 /><h2>Growth focus</h2><p>Grow verified reach, improve reporting speed, and convert digital pharma operations needs.</p></div>
        <div className="dashboard-panel"><Clock3 /><h2>Pending orders</h2><p>{stats.pendingOrders} active pending orders need review across enquiry and implementation pipelines.</p></div>
      </div>
    </>
  );
}

export default AdminDashboardPage;
