import { useEffect, useMemo, useState } from 'react';
import { ClipboardCheck, Filter, PackageSearch, Search, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import Button from '../components/Button.jsx';
import { products as fallbackProducts } from '../data/siteData.js';
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
            <p className="eyebrow">Product catalogue</p>
            <h1>Dental material products for daily clinic work.</h1>
            <p>
              Browse restorative, impression, adhesive, and infection-control supplies with clear categories,
              product notes, stock indicators, and enquiry-focused actions.
            </p>
          </div>
          <div className="catalogue-summary">
            <span><PackageSearch /> {products.length} listed products</span>
            <span><ClipboardCheck /> {categories.length - 1} active categories</span>
            <span><Truck /> {totalStock}+ stock units shown</span>
          </div>
        </div>
      </div>

      <div className="container catalogue-toolbar">
        <label className="search-box">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product, category, or use" />
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
        <div><ShieldCheck /><h3>Quality-led supply</h3><p>Product sections are designed to help dental professionals quickly understand suitability and request details.</p></div>
        <div><ClipboardCheck /><h3>Quote-ready enquiries</h3><p>Customers can shortlist requirements and contact GL Healthcare for pricing, availability, and ordering support.</p></div>
        <div><Truck /><h3>Clinic purchase flow</h3><p>The catalogue supports repeat product discovery for clinics that need regular dental material supply.</p></div>
      </div>
    </section>
  );
}

export default Products;
