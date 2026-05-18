import { useMemo } from 'react';
import { mockReviewsByOffer } from '../mocks/reviews';
import type { GetOfferReviewsParams, OfferReview } from '../models/ReviewModels';
import { mockQueryMissing, mockQueryOk, type MockQueryResult } from '../mocks/api';

export interface OfferReviewsPage {
  items: OfferReview[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

interface UseOfferReviewsOptions {
  enabled?: boolean;
}

export const useOfferReviews = (
  offerId: number,
  params: GetOfferReviewsParams = {},
  options: UseOfferReviewsOptions = {}
): MockQueryResult<OfferReviewsPage> => {
  const { OrderBy = 'CreatedAt', OrderDescending = true, PageNumber = 1, PageSize = 10 } = params;
  const enabled = options.enabled ?? true;

  return useMemo(() => {
    if (!enabled) {
      return mockQueryMissing<OfferReviewsPage>();
    }
    const all = mockReviewsByOffer[offerId] ?? [];
    const sorted = [...all].sort((a, b) => {
      if (OrderBy === 'Rating') {
        return OrderDescending ? b.rating - a.rating : a.rating - b.rating;
      }
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return OrderDescending ? bDate - aDate : aDate - bDate;
    });
    const start = (PageNumber - 1) * PageSize;
    const items = sorted.slice(start, start + PageSize);
    return mockQueryOk<OfferReviewsPage>({
      items,
      totalCount: sorted.length,
      pageNumber: PageNumber,
      pageSize: PageSize,
      totalPages: Math.max(1, Math.ceil(sorted.length / PageSize)),
    });
  }, [offerId, OrderBy, OrderDescending, PageNumber, PageSize, enabled]);
};
