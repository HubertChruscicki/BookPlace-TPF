import type { OfferReview, ReviewPhoto } from '../models/ReviewModels';
import { mockOfferDetails } from './offers';

const REVIEW_TEXTS = [
  'Absolutely loved this place! The host was incredibly welcoming and the apartment was exactly as described. Spotless, comfortable beds and a great location. Would book again in a heartbeat.',
  'A really pleasant stay. The check-in process was smooth and the place had everything we needed. The neighbourhood was quiet at night which we appreciated after long days of sightseeing.',
  'Beautiful interior, lots of natural light and a well equipped kitchen. The only minor downside was that the water pressure in the shower could be a bit stronger, but overall a fantastic stay.',
  'The photos do not do this place justice — it is even nicer in person. Super stylish, very clean, and the host responded quickly to all our questions.',
  'Perfect base for exploring the city. Walking distance to the main attractions, great coffee shops nearby, and the bed was extremely comfortable. Highly recommended.',
  'We stayed here as a family of four and everyone had enough space. The kids loved the cozy living room. We will definitely come back next year.',
  'Five stars for the host — went above and beyond to make our stay special. Left a small welcome basket on arrival which was a really nice touch.',
  'Great value for money. The apartment is exactly what you see in the pictures. Clean, modern and in a really convenient location.',
  'Lovely place with a great vibe. Comfortable furniture, fast Wi-Fi (perfect for remote work) and very easy communication with the host. Recommended.',
  'Really enjoyed our stay. Quiet building, comfortable bed, well stocked kitchen. The only thing I would mention is that the lift is on the small side but that is hardly the host\u2019s fault.',
  'Came here for a long weekend with friends and had a great time. The space is exactly as advertised and the host gave us some excellent restaurant recommendations.',
  'Highly recommended! The apartment is beautiful, the location is unbeatable and the host is very responsive. We will definitely book again on our next trip.',
];

const GUEST_NAMES = [
  'Sarah M.', 'James K.', 'Olivia R.', 'David P.', 'Emma L.', 'Daniel W.',
  'Sophia T.', 'Michael B.', 'Hannah F.', 'Lucas C.', 'Mia N.', 'Ethan J.',
];

const buildReviewPhoto = (id: number, originalUrl: string): ReviewPhoto => ({
  id,
  originalUrl,
  thumbnailUrl: originalUrl,
});

const generateReviewsForOffer = (offerId: number, count: number): OfferReview[] => {
  const offer = mockOfferDetails.find((o) => o.id === offerId);
  return Array.from({ length: count }, (_, i): OfferReview => {
    const textIndex = (offerId * 3 + i) % REVIEW_TEXTS.length;
    const nameIndex = (offerId * 5 + i) % GUEST_NAMES.length;
    const ratingPool = [5, 5, 5, 4, 4, 4, 4, 3, 5, 5];
    const rating = ratingPool[(offerId + i) % ratingPool.length];
    const daysAgo = i * 11 + ((offerId * 7) % 14);
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    const includePhotos = i % 3 === 0 && offer && offer.photos.length > 0;
    const photos: ReviewPhoto[] = includePhotos
      ? offer.photos.slice(0, Math.min(2, offer.photos.length)).map((p, idx) =>
          buildReviewPhoto(offerId * 1000 + i * 10 + idx, p.mediumUrl ?? p.originalUrl)
        )
      : [];
    return {
      id: offerId * 1000 + i,
      bookingId: offerId * 100 + i,
      guestId: `guest-${nameIndex}`,
      guestName: GUEST_NAMES[nameIndex],
      guestProfilePictureUrl: `https://i.pravatar.cc/80?img=${(nameIndex * 7 + offerId) % 70}`,
      offerId,
      rating,
      content: REVIEW_TEXTS[textIndex],
      createdAt,
      photos,
    };
  });
};

export const mockReviewsByOffer: Record<number, OfferReview[]> = mockOfferDetails.reduce(
  (acc, offer) => {
    const count = Math.max(4, Math.min(offer.reviewsCount ?? 6, 10));
    acc[offer.id] = generateReviewsForOffer(offer.id, count);
    return acc;
  },
  {} as Record<number, OfferReview[]>
);
