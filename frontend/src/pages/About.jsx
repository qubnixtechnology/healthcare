import { Award, BadgeCheck, Building2, HeartPulse, PackageCheck, Target, Users } from 'lucide-react';
import { company } from '../data/siteData.js';

const capabilities = [
  'Dental materials arranged by clinical use',
  'Simple enquiry-led buying journey',
  'Product presentation made for dentist customers',
  'Support for repeat clinic supply requirements',
];

function About() {
  return (
    <section className="page-section about-page">
      <div className="container page-intro about-hero-copy">
        <p className="eyebrow">About GL Healthcare</p>
        <h1>Supplying dental material products with clarity and care.</h1>
        <p>
          GL Healthcare is built around one clear goal: helping dentists discover, compare, and request dental
          material products through a clean digital catalogue and a responsive enquiry process.
        </p>
      </div>

      <div className="container about-layout about-story-layout">
        <div className="about-image-wrap">
          <img
            src="https://images.pexels.com/photos/5355919/pexels-photo-5355919.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Dental healthcare professional workspace and clinical material preparation"
          />
          <div className="about-image-note">
            <strong>Dental-focused</strong>
            <span>Built for clinics, dentists, and supply teams</span>
          </div>
        </div>
        <div className="about-panel detailed-panel">
          <p className="eyebrow">Client brief</p>
          <h2>New website for dental material sales</h2>
          <p><strong>Company:</strong> {company.name}</p>
          <p><strong>Contact:</strong> {company.contact}</p>
          <p><strong>Main goal:</strong> Sell dental material products.</p>
          <p><strong>Audience:</strong> {company.audience}</p>
          <p><strong>Primary flow:</strong> Browse products, create customer account, send enquiry, track activity.</p>
        </div>
      </div>

      <div className="container mission-grid">
        <article>
          <Target />
          <h3>Our focus</h3>
          <p>Make dental product discovery simple for professionals who need dependable material options and clear next steps.</p>
        </article>
        <article>
          <PackageCheck />
          <h3>Product approach</h3>
          <p>Organize core categories like restoratives, impressions, adhesives, and infection control into a clinic-ready catalogue.</p>
        </article>
        <article>
          <Building2 />
          <h3>Customer fit</h3>
          <p>Support dentists and dental clinics that want quick supplier communication and practical product information.</p>
        </article>
      </div>

      <div className="container values-grid about-values-grid">
        <div><HeartPulse /><h3>Clinic-first service</h3><p>Every page is built for dentists searching, comparing, and enquiring quickly.</p></div>
        <div><Award /><h3>Professional catalogue</h3><p>Products are presented with categories, stock signals, prices, and concise descriptions.</p></div>
        <div><Users /><h3>Relationship-led sales</h3><p>Contact and dashboard flows support customer enquiries and follow-ups.</p></div>
        <div><BadgeCheck /><h3>Trust and clarity</h3><p>Clean page structure, direct contact details, and focused messaging help customers act with confidence.</p></div>
      </div>

      <div className="container capability-strip">
        {capabilities.map((item) => <span key={item}><BadgeCheck size={18} /> {item}</span>)}
      </div>
    </section>
  );
}

export default About;