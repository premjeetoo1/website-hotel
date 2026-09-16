export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin motion-reduce:animate-none" />
        </div>
        <div className="text-center">
          <p className="font-heading font-bold text-lg text-dark-900">Aaroshi Hotel & Family Restaurant</p>
          <p className="text-xs text-dark-500">Loading deliciousness...</p>
          <span className="sr-only">Loading Aaroshi Hotel & Family Restaurant...</span>
        </div>
      </div>
    </div>
  );
}
