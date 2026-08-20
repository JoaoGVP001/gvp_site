export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-intro shell">
      <p className="eyebrow"><span /> {eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
