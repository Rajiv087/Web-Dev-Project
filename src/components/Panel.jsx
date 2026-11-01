export default function Panel({ title, large = false, className = '', children }) {
  const classes = ['panel', large && 'panel--large', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes}>
      <h2 className="panel__title">{title}</h2>
      {children}
    </section>
  );
}
