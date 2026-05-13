import { useMemo } from 'react';
import { mockAmenities, mockOfferDetails, mockOfferTypes } from '../mocks/offers';
import type { Amenity, OfferDetail, OfferType } from '../models/OfferModels';
import { mockQueryMissing, mockQueryOk, type MockQueryResult } from '../mocks/api';

/**
 * Mock-only replacement for the original react-query based hook.
 * Returns the OfferDetail matching the given id from the static mock dataset.
 */
export const useOffer = (id: string | number | undefined): MockQueryResult<OfferDetail> => {
  const result = useMemo(() => {
    if (id === undefined || id === null || id === '') {
      return mockQueryMissing<OfferDetail>();
    }
    const numericId = typeof id === 'string' ? Number(id) : id;
    const found = mockOfferDetails.find((offer) => offer.id === numericId);
    return found ? mockQueryOk(found) : mockQueryMissing<OfferDetail>();
  }, [id]);

  return result;
};

export const useAmenities = (): MockQueryResult<Amenity[]> => mockQueryOk(mockAmenities);

export const useOfferTypes = (): MockQueryResult<OfferType[]> => mockQueryOk(mockOfferTypes);
