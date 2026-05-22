import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FlaskConical,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Syringe,
  Truck,
} from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import StatBlock from '../components/StatBlock.jsx';
import Button from '../components/Button.jsx';
import { heroImage, products } from '../data/siteData.js';

const categories = [
  {
    icon: FlaskConical,
    title: 'Restorative Materials',
    text: 'Composite kits, bonding systems, etchants, liners, and daily restorative consumables.',
  },
  {
    icon: Syringe,
    title: 'Impression & Prosthetic',
    text: 'Impression material, trays, prosthetic support products, and crown-and-bridge supplies.',
  },
  {
    icon: ShieldCheck,
    title: 'Infection Control',
    text: 'Sterilization pouches, clinic safety essentials, and hygiene-focused supply packs.',
  },
];

const steps = [
  'Select your required dental material category.',
  'Send an enquiry with product quantity and clinic details.',
  'Receive availability, pricing, and support from GL Healthcare.',
];

function Home() {
  return (
    <>
      <section
        className="hero hero-enhanced"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(6, 35, 49, 0.88), rgba(6, 35, 49, 0.38)), url(${heroImage})` }}
      >
        <div className="container hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Dental material products for professionals</p>
            <h1>GL Healthcare</h1>
            <p>
              A focused dental supply website for clinics that need dependable restorative, impression,
              adhesive, sterilization, and chairside material products with quick enquiry support.
            </p>
            <div className="hero-actions">
              <Button to="/products">Explore Catalogue <ArrowRight size={18} /></Button>
              <Button variant="light" to="/contact">Request Bulk Quote</Button>
            </div>
            <div className="trust-row" aria-label="GL Healthcare service strengths">
              <span><BadgeCheck size={17} /> Dentist-focused catalogue</span>
              <span><Truck size={17} /> Enquiry-led ordering</span>
              <span><Headphones size={17} /> Direct support</span>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Quick product summary">
            <div className="hero-panel-top">
              <span><Sparkles size={18} /> Clinic supply focus</span>
              <strong>250+</strong>
            </div>
            <p>Dental materials organized for easy browsing, faster quoting, and repeat clinic purchasing.</p>
            <div className="hero-mini-list">
              <span>Restoratives</span>
              <span>Impression</span>
              <span>Adhesives</span>
              <span>Sterilization</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="container stats-row home-stats" aria-label="Business highlights">
        <StatBlock value="4" label="Core product groups" />
        <StatBlock value="250+" label="Clinic-ready supplies" />
        <StatBlock value="24 hr" label="Response target" />
      </section>

      <section className="container section-grid home-intro-grid">
        <div>
          <p className="eyebrow">Built for dental clinics</p>
          <h2>Clear product discovery, practical details, and simple enquiry flow.</h2>
          <p>
            GL Healthcare helps dentists and clinic teams quickly understand what is available,
            compare common dental material categories, and contact the supplier without friction.
          </p>
        </div>
        <div className="feature-grid elevated-grid">
          <div className="feature"><PackageCheck /><h3>Curated stock</h3><p>Daily-use dental material categories shaped around real clinic needs.</p></div>
          <div className="feature"><ShieldCheck /><h3>Quality focus</h3><p>Clean product details, professional visuals, and confidence-building service signals.</p></div>
          <div className="feature"><Truck /><h3>Fast enquiry flow</h3><p>Customers can request pricing and availability from the contact and catalogue pages.</p></div>
          <div className="feature"><BadgeCheck /><h3>Dentist audience</h3><p>Messaging, categories, and layout are focused on dental professionals.</p></div>
        </div>
      </section>

      <section className="category-band">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Shop by requirement</p>
            <h2>Everything a dental team checks first.</h2>
          </div>
          <Button variant="unstyled" className="text-action" to="/products">Browse all categories</Button>
        </div>
        <div className="container category-grid">
          {categories.map(({ icon: Icon, title, text }) => (
            <article className="category-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
              <Button variant="unstyled" className="text-action" to="/products">View products <ArrowRight size={16} /></Button>
            </article>
          ))}
        </div>
      </section>

      <section className="product-band enhanced-products">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Featured products</p>
            <h2>Dental essentials for modern clinics</h2>
          </div>
          <Button variant="unstyled" className="text-action" to="/products">All products</Button>
        </div>
        <div className="container product-grid">
          {products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="container workflow-section">
        <div className="workflow-copy">
          <p className="eyebrow">How ordering works</p>
          <h2>Simple buying support from enquiry to quote.</h2>
          <p>
            The website is designed to bring customers from product interest to supplier conversation quickly,
            with enough information to make the first enquiry meaningful.
          </p>
          <Button to="/contact">Start an enquiry</Button>
        </div>
        <div className="workflow-list">
          {steps.map((step, index) => (
            <div className="workflow-step" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="quality-band">
        <div className="container quality-layout">
          <div>
            <p className="eyebrow">GL Healthcare promise</p>
            <h2>Professional product presentation for dentist customers.</h2>
          </div>
          <div className="quality-points">
            <p><ClipboardCheck /> Product details that are easy to scan</p>
            <p><ShieldCheck /> Trust-building layout and clean UI</p>
            <p><Headphones /> Direct contact for requirements and quotes</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
