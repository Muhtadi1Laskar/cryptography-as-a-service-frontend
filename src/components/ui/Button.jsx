export default function ButtonGroup({ type, className, loading, message }) {
  return (
    <button type={type} className={className} disabled={loading}>
      {loading ? "Processing..." : message}
    </button>
  );
}
