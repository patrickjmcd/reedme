import { useState } from "react";

/**
 * A follow-up offer that belongs to one visit to a source.
 *
 * Every change of sourceKey starts a new visit (a new generation, even when
 * returning to an earlier source) and drops the offer, during render rather
 * than in an effect. Async work captures `generation` when it starts and
 * passes it back, so a late completion from an earlier visit can't show,
 * replace or clear the current visit's offer.
 */
export function useSourceOffer(sourceKey: string) {
  const [visit, setVisit] = useState({ key: sourceKey, generation: 0 });
  const [offerGeneration, setOfferGeneration] = useState<number | null>(null);
  if (visit.key !== sourceKey) {
    setVisit({ key: sourceKey, generation: visit.generation + 1 });
    setOfferGeneration(null);
  }

  return {
    offered: offerGeneration === visit.generation,
    generation: visit.generation,
    offer: (generation: number) =>
      setOfferGeneration((current) => Math.max(current ?? -1, generation)),
    withdraw: (generation: number) =>
      setOfferGeneration((current) => (current === generation ? null : current)),
  };
}
