import { useEffect, useState } from 'react';
import { BarChart3, CheckCircle2, ClipboardList, Clock3, Package, TrendingUp, Users } from 'lucide-react';
import StatBlock from '../components/StatBlock.jsx';
import { api } from '../services/api.js';
import { company } from '../data/siteData.js';

const tasks = [
  { label: 'Review new pharma-tech enquiries', status: 'High priority' },
  { label: 'Confirm QR verification implementation scope', status: 'Today' },
  { label: 'Send follow-up to healthcare partner', status: 'Pending' },
];

const pipeline = [
  ['New enquiry', 'Collect solution requirement, location, and healthcare partner details'],
  ['Scope review', 'Confirm QR, GPS, reporting, and implementation needs'],
  ['Proposal shared', 'Share next steps, timeline, and operating model'],
  ['Execution follow-up', 'Support rollout, reporting, and relationship tracking'],
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
          <p className="eyebrow">Operations dashboard</p>
          <h1>Track pharma-tech enquiries, healthcare partners, and field activity.</h1>
          <p>
            A practical dashboard surface for {company.name} to monitor solution demand, clinic and hospital
            enquiries, field execution, and follow-ups from one place.
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
        <StatBlock value={stats.products} label="Solutions" />
        <StatBlock value={stats.enquiries} label="Enquiries" />
        <StatBlock value={stats.customers} label="Customers" />
        <StatBlock value={stats.pendingOrders} label="Pending orders" />
      </div>

      <div className="dashboard-grid dashboard-insight-grid">
        <div className="dashboard-panel"><Package /><h2>Recent solution requests</h2><p>QR authentication, GPS tracking, pharma software, reporting, and verified medicine reach.</p></div>
        <div className="dashboard-panel"><ClipboardList /><h2>Engagement workflow</h2><p>Review enquiry, confirm scope, share proposal, prepare rollout, and log follow-up activity.</p></div>
        <div className="dashboard-panel"><Users /><h2>Partner segment</h2><p>Doctors, hospitals, clinics, pharma partners, distributors, and healthcare operations teams.</p></div>
        <div className="dashboard-panel"><BarChart3 /><h2>Growth focus</h2><p>Grow verified reach, improve reporting speed, and convert digital pharma operations needs.</p></div>
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
