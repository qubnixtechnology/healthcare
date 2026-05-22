import { useEffect, useState } from 'react';
import { BarChart3, CheckCircle2, ClipboardList, Clock3, Package, TrendingUp, Users } from 'lucide-react';
import StatBlock from '../components/StatBlock.jsx';
import { api } from '../services/api.js';

const tasks = [
  { label: 'Review new product enquiries', status: 'High priority' },
  { label: 'Confirm stock for restorative kits', status: 'Today' },
  { label: 'Send quote follow-up to clinic customer', status: 'Pending' },
];

const pipeline = [
  ['New enquiry', 'Collect product requirement and clinic details'],
  ['Availability check', 'Confirm stock, pricing, and delivery feasibility'],
  ['Quote sent', 'Share final quote and next steps with customer'],
  ['Order follow-up', 'Support repeat purchases and relationship tracking'],
];

function Dashboard() {
  const [stats, setStats] = useState({ products: 4, enquiries: 18, customers: 12, pendingOrders: 7 });

  useEffect(() => {
    api.stats().then((data) => setStats(data.stats || stats)).catch(() => null);
  }, []);

  return (
    <section className="container page-section dashboard-page">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Customer dashboard</p>
          <h1>Track dental product interest, enquiries, and customer activity.</h1>
          <p>
            A practical dashboard surface for GL Healthcare to monitor product demand, clinic enquiries,
            customer movement, and quote follow-ups from one place.
          </p>
        </div>
        <div className="dashboard-status-card">
          <Clock3 />
          <span>Today focus</span>
          <strong>{stats.enquiries} enquiries</strong>
          <p>Review open requests and convert interested clinics into active customers.</p>
        </div>
      </div>

      <div className="stats-row dashboard-stats">
        <StatBlock value={stats.products} label="Products" />
        <StatBlock value={stats.enquiries} label="Enquiries" />
        <StatBlock value={stats.customers} label="Customers" />
        <StatBlock value={stats.pendingOrders} label="Pending orders" />
      </div>

      <div className="dashboard-grid dashboard-insight-grid">
        <div className="dashboard-panel"><Package /><h2>Recent product requests</h2><p>Composite kits, impression material, sterilization pouches, bonding agents, and daily clinic consumables.</p></div>
        <div className="dashboard-panel"><ClipboardList /><h2>Order workflow</h2><p>Review enquiry, confirm availability, send quote, prepare dispatch, and log follow-up activity.</p></div>
        <div className="dashboard-panel"><Users /><h2>Customer segment</h2><p>Dentists, dental clinics, clinic owners, and dental procurement assistants.</p></div>
        <div className="dashboard-panel"><BarChart3 /><h2>Sales focus</h2><p>Grow catalogue enquiries, improve quote speed, and convert repeat clinic supply needs.</p></div>
      </div>

      <div className="dashboard-lower-grid">
        <div className="task-panel">
          <div className="panel-heading"><h2>Priority actions</h2><TrendingUp /></div>
          {tasks.map((task) => (
            <div className="task-row" key={task.label}>
              <CheckCircle2 />
              <span>{task.label}</span>
              <strong>{task.status}</strong>
            </div>
          ))}
        </div>
        <div className="pipeline-panel">
          <div className="panel-heading"><h2>Enquiry pipeline</h2><ClipboardList /></div>
          {pipeline.map(([title, text], index) => (
            <div className="pipeline-step" key={title}>
              <span>{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;