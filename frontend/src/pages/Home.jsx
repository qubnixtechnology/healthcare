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
import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import StatBlock from '../components/StatBlock.jsx';
import Button from '../components/Button.jsx';
import { company, products as fallbackProducts } from '../data/siteData.js';
import { api } from '../services/api.js';

const categories = [
  {
    icon: FlaskConical,
    title: 'Advanced Pharma Software',
    text: 'Digital workflows for transparent pharmaceutical marketing, reporting, and operational control.',
  },
  {
    icon: Syringe,
    title: 'GPS Field Tracking',
    text: 'Real-time field-force visibility that keeps every clinic, doctor, and hospital visit accountable.',
  },
  {
    icon: ShieldCheck,
    title: 'Strip-by-Strip QR Authentication',
    text: 'Unique QR verification for medicine authenticity, traceability, and instant digital confidence.',
  },
];

const steps = [
  'Share your pharma marketing, clinic reach, or product traceability requirement.',
  'Our team reviews the operational scope, locations, and digital reporting needs.',
  `Receive transparent guidance and next steps from ${company.name}.`,
];

function AnimatedNumber({ value, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 900;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{displayValue}{suffix}</>;
}

function Home() {
  const [products, setProducts] = useState(fallbackProducts);

  useEffect(() => {
    api.products()
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length) setProducts(data.products);
      })
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const productStats = useMemo(() => {
    const categories = new Set(products.map((product) => product.category).filter(Boolean));
    const totalStock = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
    return {
      categoryCount: categories.size,
      clinicReadySupplies: totalStock,
    };
  }, [products]);

  return (
    <>
      <section className="hero hero-enhanced pharma-hero">
        <div className="hero-video-loop" aria-hidden="true">
          <div className="hero-loop-frame hero-loop-frame-one" />
          <div className="hero-loop-frame hero-loop-frame-two" />
          <div className="hero-loop-frame hero-loop-frame-three" />
          <div className="hero-loop-sweep" />
        </div>
        <div className="container hero-layout">
          <div className="hero-content">
            <p className="eyebrow">Global pharma-tech field operations</p>
            <h1>{company.name}</h1>
            <p>
              A technology-led healthcare partner connecting medicine reach, GPS-enabled field-force
              visibility, real-time reporting, and verified pharma operations through one dependable ecosystem.
            </p>
            <div className="hero-actions">
              <Button to="/contact">Partner With Us <ArrowRight size={18} /></Button>
              <Button variant="light" to="/products">Explore Our Products</Button>
            </div>
            <div className="trust-row" aria-label={`${company.name} service strengths`}>
              <span><BadgeCheck size={17} /> Strip-level QR verification</span>
              <span><Truck size={17} /> GPS-enabled reporting</span>
              <span><Headphones size={17} /> Transparent support</span>
            </div>
          </div>

          <aside className="hero-showcase" aria-label="Pharma technology banner visual">
            <div className="showcase-topline">
              <span><Sparkles size={18} /> Live field intelligence</span>
              <strong><AnimatedNumber value={productStats.clinicReadySupplies} suffix="+" /></strong>
            </div>
            <div className="showcase-scene">
              <div className="phone-mockup">
                <div className="phone-map">
                  <span className="map-pin pin-one" />
                  <span className="map-pin pin-two" />
                  <span className="map-pin pin-three" />
                  <span className="map-route" />
                </div>
                <div className="phone-footer">
                  <span>GPS route</span>
                  <strong>Active</strong>
                </div>
              </div>
              <div className="medicine-stack">
                <span />
                <span />
                <span />
              </div>
              <div className="field-force-card">
                <span>Field Force</span>
                <strong>Tablet reporting</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container stats-row home-stats" aria-label="Business highlights">
        <StatBlock value={<AnimatedNumber value={productStats.categoryCount} />} label="Core solution groups" />
        <StatBlock value={<AnimatedNumber value={productStats.clinicReadySupplies} suffix="+" />} label="Verified reach capacity" />
        <StatBlock value="24 hr" label="Response target" />
      </section>

      <section className="container section-grid home-intro-grid">
        <div>
          <p className="eyebrow">Precision, transparency, and tech-enabled healthcare</p>
          <h2>Patient care meets cutting-edge pharmaceutical operations.</h2>
          <p>
            {company.name} is building a transparent and secure ecosystem powered by Advanced Pharma
            Software, GPS-enabled tracking, and smart strip-by-strip QR code integration.
          </p>
        </div>
        <div className="feature-grid elevated-grid">
          <div className="feature"><PackageCheck /><h3>Digital infrastructure</h3><p>Modern pharma software streamlines reach, reporting, and accountability.</p></div>
          <div className="feature"><ShieldCheck /><h3>QR authenticity</h3><p>Strip-level verification helps healthcare professionals and consumers confirm product authenticity.</p></div>
          <div className="feature"><Truck /><h3>Real-time field visibility</h3><p>GPS-based field tracking supports precise, time-bound clinic and hospital outreach.</p></div>
          <div className="feature"><BadgeCheck /><h3>Zero-gap ambition</h3><p>A tech-powered framework designed to help quality medicines reach patients without delay.</p></div>
        </div>
      </section>

      <section className="category-band">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Tech-powered framework</p>
            <h2>Everything modern pharma operations need to stay accountable.</h2>
          </div>
          <Button variant="unstyled" className="text-action" to="/products">Browse all solutions</Button>
        </div>
        <div className="container category-grid">
          {categories.map(({ icon: Icon, title, text }) => (
            <article className="category-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
              <Button variant="unstyled" className="text-action" to="/products">View solution <ArrowRight size={16} /></Button>
            </article>
          ))}
        </div>
      </section>

      <section className="product-band enhanced-products">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Featured solutions</p>
            <h2>Digital tools for transparent pharma marketing</h2>
          </div>
          <Button variant="unstyled" className="text-action" to="/products">All solutions</Button>
        </div>
        <div className="container product-grid">
          {products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="container workflow-section">
        <div className="workflow-copy">
          <p className="eyebrow">How engagement works</p>
          <h2>From requirement to transparent digital execution.</h2>
          <p>
            The website brings healthcare partners from operational interest to a focused Curaveris conversation,
            with enough detail to discuss reach, reporting, verification, and implementation.
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
            <p className="eyebrow">{company.name} promise</p>
            <h2>Transparent medicine reach powered by software, tracking, and verification.</h2>
          </div>
          <div className="quality-points">
            <p><ClipboardCheck /> Real-time reporting and data-led decisions</p>
            <p><ShieldCheck /> Strip-by-strip QR code authentication</p>
            <p><Headphones /> Direct contact for pharma operations and partnerships</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
