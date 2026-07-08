export function LoadingSpinner({ message = "Loading...", size = "h-12 w-12" }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600 ${size}`}
        />
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );
}
