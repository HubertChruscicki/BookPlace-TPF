import { useCallback, useState } from 'react';
import type { MockMutationCallbacks, MockMutationResult } from '../mocks/api';

export interface CreateBookingPayload {
  offerId: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
}

export const useCreateBooking = (): MockMutationResult<CreateBookingPayload> & {
  isPending: boolean;
} => {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (payload: CreateBookingPayload, callbacks?: MockMutationCallbacks) => {
      setIsPending(true);
      // simulate a short network round-trip so the UI shows the loading state
      setTimeout(() => {
        setIsPending(false);
        // eslint-disable-next-line no-console
        console.info('[mock] createBooking called with', payload);
        callbacks?.onSuccess?.();
      }, 400);
    },
    []
  );

  return { mutate, isPending };
};
