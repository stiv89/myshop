interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({ 
  size = "md", 
  className = "" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
      />
    </div>
  );
}

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({ lines = 3, className = "" }: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <div className="skeleton h-40 bg-gray-200 rounded-md mb-3 animate-pulse" />
      <div className="skeleton h-6 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="skeleton h-4 bg-gray-200 rounded mb-3 animate-pulse" />
      <div className="skeleton h-6 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="skeleton h-10 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
