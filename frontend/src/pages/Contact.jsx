import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building2, Clock3, Mail, MapPin, MessageSquareText, Phone, Send, ShieldCheck } from 'lucide-react';
import Button from '../components/Button.jsx';
import { company } from '../data/siteData.js';
import { api } from '../services/api.js';

function Contact() {
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product');
  const initialMessage = product ? `I want to enquire about ${product}. Please share implementation details and availability.` : '';
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: initialMessage });
  const [message, setMessage] = useState('');
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    try {
      const data = await api.contact(form);
      setMessage(data.message || 'Thank you. We will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="page-section contact-page">
      <div className="container contact-header">
        <p className="eyebrow">Contact {company.name}</p>
        <h1>Send your pharma-tech requirement.</h1>
        <p>
          Share your product traceability, GPS tracking, reporting, clinic reach, or partnership requirement.
          The {company.name} team can respond with implementation details and next steps.
        </p>
      </div>

      <div className="container contact-layout enhanced-contact-layout">
        <div className="contact-info enhanced-contact-info">
          <span className="contact-badge"><MessageSquareText size={18} /> Fast enquiry support</span>
          <h2>Talk to the supplier directly.</h2>
          <p><Mail /> {company.email}</p>
          <p><Phone /> Call or WhatsApp: {company.phone}</p>
          <p><MapPin /> India</p>
          <div className="contact-mini-grid">
            <div><Clock3 /><strong>24 hr</strong><span>Response target</span></div>
            <div><Building2 /><strong>Pharma</strong><span>Primary focus</span></div>
            <div><ShieldCheck /><strong>Secure</strong><span>Enquiry records</span></div>
          </div>
        </div>

        <form className="contact-form enhanced-contact-form" onSubmit={submit}>
          <div className="form-heading">
            <h2>Request a quote</h2>
            <p>Add solution needs, location, operational scope, and preferred contact time.</p>
          </div>
          <label>Name<input name="name" value={form.name} onChange={update} required placeholder="Organization or contact name" /></label>
          <label>Email<input type="email" name="email" value={form.email} onChange={update} required placeholder="you@example.com" /></label>
          <label>Phone<input name="phone" value={form.phone} onChange={update} placeholder="Mobile number" /></label>
          <label>Message<textarea name="message" value={form.message} onChange={update} rows="6" required placeholder="Tell us about your pharma software, GPS tracking, reporting, or QR verification requirement" /></label>
          <Button type="submit">Submit enquiry <Send size={18} /></Button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;
