import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BarChart3, BriefcaseMedical, Clock3, ClipboardList, PackageSearch, Users } from 'lucide-react';
import Button from '../../components/Button.jsx';
import { api } from '../../services/api.js';
import AdminDashboardPage from './AdminDashboardPage.jsx';
import AdminEnquiriesPage from './AdminEnquiriesPage.jsx';
import AdminPendingOrdersPage from './AdminPendingOrdersPage.jsx';
import AdminSolutionsPage from './AdminSolutionsPage.jsx';
import AdminUsersPage from './AdminUsersPage.jsx';

const emptyStats = { solutions: 0, enquiries: 0, users: 0, pendingOrders: 0 };

const adminNavItems = [
  { key: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { key: 'solutions', path: '/dashboard/solutions', label: 'Solutions', icon: PackageSearch },
  { key: 'enquiries', path: '/dashboard/enquiries', label: 'Enquiries', icon: ClipboardList },
  { key: 'users', path: '/dashboard/users', label: 'Users', icon: Users },
  { key: 'pendingOrders', path: '/dashboard/pending-orders', label: 'Pending orders', icon: Clock3 },
];

const sectionFromParam = {
  solutions: 'solutions',
  enquiries: 'enquiries',
  users: 'users',
  'pending-orders': 'pendingOrders',
};

const pathForSection = {
  dashboard: '/dashboard',
  solutions: '/dashboard/solutions',
  enquiries: '/dashboard/enquiries',
  users: '/dashboard/users',
  pendingOrders: '/dashboard/pending-orders',
};

function AdminPage() {
  const { section } = useParams();
  const navigate = useNavigate();
  const activeSection = sectionFromParam[section] || 'dashboard';
  const [stats, setStats] = useState(emptyStats);
  const [enquiries, setEnquiries] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    Promise.all([
      api.adminDashboardStats(),
      api.adminEnquiries(),
      api.adminSolutions(),
      api.adminUsers(),
      api.adminPendingOrders(),
    ])
      .then(([statsData, enquiriesData, solutionsData, usersData, pendingOrdersData]) => {
        setStats(statsData.stats || emptyStats);
        setEnquiries(enquiriesData.enquiries || []);
        setSolutions(solutionsData.solutions || []);
        setUsers(usersData.users || []);
        setPendingOrders(pendingOrdersData.pendingOrders || []);
      })
      .catch(() => null);
  }, []);

  const activeLabel = adminNavItems.find((item) => item.key === activeSection)?.label || 'Dashboard';
  const goToSection = (key) => navigate(pathForSection[key] || '/dashboard');

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-sidebar-brand">
          <span><BriefcaseMedical size={24} /></span>
          <strong>Admin</strong>
        </div>
        <nav className="admin-side-nav">
          {adminNavItems.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant="unstyled"
              className={activeSection === key ? 'admin-side-link is-active' : 'admin-side-link'}
              onClick={() => goToSection(key)}
            >
              <Icon size={19} /> {label}
            </Button>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <p>Hello, Admin</p>
          <span>{activeLabel}</span>
        </div>
        <div className="admin-content">
          {activeSection === 'dashboard' && <AdminDashboardPage stats={stats} onNavigate={goToSection} />}
          {activeSection === 'solutions' && <AdminSolutionsPage solutions={solutions} />}
          {activeSection === 'enquiries' && <AdminEnquiriesPage enquiries={enquiries} />}
          {activeSection === 'users' && <AdminUsersPage users={users} />}
          {activeSection === 'pendingOrders' && <AdminPendingOrdersPage pendingOrders={pendingOrders} />}
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
