export default function LoadingSpinner() {
  return (
    <div className="text-center py-8">
      <div
        className="text-white inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
