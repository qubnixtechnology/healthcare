import { useEffect, useMemo, useState } from 'react';
import { ClipboardCheck, Filter, PackageSearch, Search, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import Button from '../components/Button.jsx';
import { company, products as fallbackProducts } from '../data/siteData.js';
import { api } from '../services/api.js';

function Products() {
  const [products, setProducts] = useState(fallbackProducts);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    api.products()
      .then((data) => {
        if (Array.isArray(data.products) && data.products.length) setProducts(data.products);
      })
      .catch(() => setProducts(fallbackProducts));
  }, []);

  const categories = ['All', ...new Set(products.map((product) => product.category))];
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const searchText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  });
  const totalStock = useMemo(() => products.reduce((sum, product) => sum + Number(product.stock || 0), 0), [products]);

  return (
    <section className="page-section products-page">
      <div className="products-hero">
        <div className="container products-hero-layout">
          <div>
            <p className="eyebrow">Solution catalogue</p>
            <h1>Tech-powered pharma marketing solutions for accountable healthcare reach.</h1>
            <p>
              Browse QR authentication, GPS field tracking, real-time reporting, and pharma software
              capabilities with clear categories, notes, capacity indicators, and enquiry-focused actions.
            </p>
          </div>
          <div className="catalogue-summary">
            <span><PackageSearch /> {products.length} listed solutions</span>
            <span><ClipboardCheck /> {categories.length - 1} active categories</span>
            <span><Truck /> {totalStock}+ reach capacity shown</span>
          </div>
        </div>
      </div>

      <div className="container catalogue-toolbar">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by solution, category, or use" />
        </label>
        <div className="filter-label"><Filter size={18} /> Filter category</div>
      </div>

      <div className="container filter-row catalogue-filters">
        {categories.map((item) => (
          <Button key={item} variant="unstyled" className={category === item ? 'chip active-chip' : 'chip'} onClick={() => setCategory(item)}>{item}</Button>
        ))}
      </div>

      <div className="container product-grid catalogue-grid">
        {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      <div className="container product-support-band">
        <div><ShieldCheck /><h3>Authenticity-led operations</h3><p>Solution sections help partners understand QR verification, traceability, and transparent medicine reach.</p></div>
        <div><ClipboardCheck /><h3>Implementation-ready enquiries</h3><p>Healthcare partners can shortlist requirements and contact {company.name} for digital pharma support.</p></div>
        <div><Truck /><h3>GPS-backed execution</h3><p>The catalogue supports field-force accountability for clinics, doctors, hospitals, and regional outreach.</p></div>
      </div>
    </section>
  );
}

export default Products;
