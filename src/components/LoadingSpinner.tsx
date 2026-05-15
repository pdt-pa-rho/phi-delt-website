import clsx from "clsx"

export default function LoadingSpinner({ size="md", className }: { size?: "xs" | "sm" | "md" | "lg", className?: string }) {
  return (
    <div className={clsx("text-center py-8", className)}>
      <div
        className={clsx(
          "text-white inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em]",
          { "h-2 w-2 border": size == "xs" },
          { "h-4 w-4 border-2": size == "sm" },
          { "h-8 w-8 border-4": size == "md" },
          { "h-16 w-16 border-8": size == "lg" },
        )}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
