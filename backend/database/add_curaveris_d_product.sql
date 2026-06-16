USE curaveris_healthcare;

INSERT INTO products (name, category, price, rating, stock, image, description)
SELECT
  'Curaveris-D Capsules',
  'Product',
  0,
  4.8,
  100,
  '/images/curaveris-d-capsules.png',
  'Rabeprazole Sodium and Domperidone sustained release capsules with Curaveris branded packaging.'
WHERE NOT EXISTS (
  SELECT 1 FROM products WHERE name = 'Curaveris-D Capsules'
);
