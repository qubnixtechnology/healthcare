import { Link } from 'react-router-dom';

function Button({
  children,
  className = '',
  to,
  variant = 'primary',
  size = '',
  type = 'button',
  ...props
}) {
  if (variant === 'unstyled') {
    if (to) {
      return (
        <Link className={className} to={to} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button className={className} type={type} {...props}>
        {children}
      </button>
    );
  }

  const variantClass = variant === 'custom' ? '' : `btn-${variant}`;
  const sizeClass = size ? `btn-${size}` : '';
  const classes = ['btn', variantClass, sizeClass, className].filter(Boolean).join(' ');

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
