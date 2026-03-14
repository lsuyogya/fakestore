export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-neutral-700"></div>
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
        </div>
        <p className="text-neutral-300 animate-pulse">Loading content...</p>
      </div>
    </div>
  );
}
