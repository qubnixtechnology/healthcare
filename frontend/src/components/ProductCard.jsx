import { Star } from 'lucide-react';
import Button from './Button.jsx';

const fallbackImage = 'https://images.pexels.com/photos/8376295/pexels-photo-8376295.jpeg?auto=compress&cs=tinysrgb&w=900';

function ProductCard({ product }) {
  const enquiryPath = `/contact?product=${encodeURIComponent(product.name)}`;

  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span><Star size={15} fill="currentColor" /> {product.rating}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <strong>{Number(product.price) > 0 ? `Rs. ${Number(product.price).toLocaleString('en-IN')}` : 'Consultation'}</strong>
          <Button variant="outline" to={enquiryPath}>Enquire</Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
