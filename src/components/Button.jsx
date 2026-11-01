const sizes = ['nav', 'add', 'hero', 'timer', 'task', 'sm'];

export default function Button({ size = 'task', className = '', ref, ...props }) {
  const classes = ['btn', sizes.includes(size) && `btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return <button ref={ref} type="button" className={classes} {...props} />;
}
