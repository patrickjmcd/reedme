import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeedFaviconProps {
  src?: string | null;
  className?: string;
}

export function FeedFavicon({ src, className }: FeedFaviconProps) {
  // Remember which URL failed, so a new src is tried again without an effect.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const loadFailed = failedSrc === src;

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
      onError={() => setFailedSrc(src)}
    />
  );
}
