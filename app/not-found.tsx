export default function NotFound() {
  return (
    <section className="min-h-[60vh] pt-28">
      <div className="container-wide">
        <h1 className="text-3xl font-semibold text-text-primary">Page not found</h1>
        <p className="mt-3 text-text-secondary">
          The page you tried to open does not exist, or the climb story has not been published yet.
        </p>
      </div>
    </section>
  );
}
