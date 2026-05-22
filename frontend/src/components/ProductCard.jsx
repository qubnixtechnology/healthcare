import { Star } from 'lucide-react';
import Button from './Button.jsx';

function ProductCard({ product }) {
  const enquiryPath = `/contact?product=${encodeURIComponent(product.name)}`;

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span><Star size={15} fill="currentColor" /> {product.rating}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <strong>Rs. {Number(product.price).toLocaleString('en-IN')}</strong>
          <Button variant="outline" to={enquiryPath}>Enquire</Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
