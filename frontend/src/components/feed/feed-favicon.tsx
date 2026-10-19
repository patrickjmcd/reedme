import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeedFaviconProps {
  src?: string | null;
  className?: string;
}

export function FeedFavicon({ src, className }: FeedFaviconProps) {
  // Retry whenever src changes (including back to a URL that failed before),
  // resetting the failure during render rather than in an effect.
  const [loadedSrc, setLoadedSrc] = useState(src);
  const [loadFailed, setLoadFailed] = useState(false);
  if (src !== loadedSrc) {
    setLoadedSrc(src);
    setLoadFailed(false);
  }

  if (!src || loadFailed) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-block shrink-0 rounded bg-gray-300 dark:bg-gray-600",
          className,
        )}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={cn("shrink-0 rounded", className)}
      loading="lazy"
      onError={() => setLoadFailed(true)}
    />
  );
}
