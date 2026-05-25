import { Award, BadgeCheck, Building2, HeartPulse, MapPinned, PackageCheck, QrCode, Target, Users } from 'lucide-react';
import { company } from '../data/siteData.js';

const capabilities = [
  'Advanced Pharma Software',
  'GPS-Based Field Tracking',
  'Real-Time Reporting',
  'Strip-by-Strip QR Code Verification',
];

function About() {
  return (
    <section className="page-section about-page">
      <div className="container page-intro about-hero-copy">
        <p className="eyebrow">About {company.name}</p>
        <h1>Precision, transparency, and tech-enabled healthcare.</h1>
        <p>
          {company.name} represents a new pharmaceutical marketing model where patient care meets
          cutting-edge technology, accountable field operations, and verified medicine authenticity.
        </p>
      </div>

      <div className="container about-layout about-story-layout">
        <div className="about-image-wrap">
          <img
            src="https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Healthcare professional workspace with digital pharmaceutical operations"
          />
          <div className="about-image-note">
            <strong>Strip-by-strip QR authentication</strong>
            <span>Digital verification for authenticity and transparency</span>
          </div>
        </div>
        <div className="about-panel detailed-panel">
          <p className="eyebrow">About us</p>
          <h2>Excellence driven by technology, care delivered by experts</h2>
          <p><strong>Company:</strong> {company.name}</p>
          <p><strong>Contact:</strong> {company.contact}</p>
          <p><strong>Main goal:</strong> Build a transparent, secure, and digital pharmaceutical marketing ecosystem.</p>
          <p><strong>Audience:</strong> {company.audience}</p>
          <p><strong>Origin:</strong> Jhansi, Uttar Pradesh.</p>
        </div>
      </div>

      <div className="container mission-grid">
        <article>
          <Target />
          <h3>Our mission</h3>
          <p>Digitize the reach of life-saving medicines through GPS tracking, real-time reporting, and QR verification.</p>
        </article>
        <article>
          <QrCode />
          <h3>Authentication</h3>
          <p>Use strip-by-strip QR codes so medicines can be verified instantly by healthcare professionals and consumers.</p>
        </article>
        <article>
          <MapPinned />
          <h3>Field accountability</h3>
          <p>Integrate the field force with real-time GPS reporting so operations remain precise, time-bound, and transparent.</p>
        </article>
      </div>

      <div className="container values-grid about-values-grid">
        <div><HeartPulse /><h3>Patient care</h3><p>Technology is used to make quality healthcare more accessible, seamless, and dependable.</p></div>
        <div><Award /><h3>Global ambition</h3><p>Curaveris is poised to redefine healthcare logistics and operations at a global standard.</p></div>
        <div><Users /><h3>Healthcare reach</h3><p>Doctors, clinics, hospitals, and partners can connect through a more transparent operating model.</p></div>
        <div><Building2 /><h3>Zero-gap infrastructure</h3><p>A tech-powered framework aims to reduce delays between verified medicines and patient needs.</p></div>
      </div>

      <div className="container capability-strip">
        {capabilities.map((item) => <span key={item}><BadgeCheck size={18} /> {item}</span>)}
      </div>
    </section>
  );
}

export default About;
