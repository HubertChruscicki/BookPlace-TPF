export const mockUpcomingBookings = [
  {
    id: 1,
    status: 'Confirmed',
    checkInDate: '2026-06-15T14:00:00Z',
    checkOutDate: '2026-06-20T10:00:00Z',
    numberOfGuests: 2,
    totalPrice: 1250.00,
    offer: {
      title: 'Luxury Villa with Ocean View',
      addressCity: 'Malibu',
      addressCountry: 'USA',
      coverPhotoUrl: 'https://picsum.photos/seed/booking1/900/600'
    }
  }
];

export const mockPastBookings = [
  {
    id: 2,
    status: 'Completed',
    checkInDate: '2025-12-10T14:00:00Z',
    checkOutDate: '2025-12-15T10:00:00Z',
    numberOfGuests: 4,
    totalPrice: 850.00,
    offer: {
      title: 'Cozy Mountain Cabin',
      addressCity: 'Aspen',
      addressCountry: 'USA',
      coverPhotoUrl: 'https://picsum.photos/seed/booking2/900/600'
    }
  },
  {
    id: 3,
    status: 'Completed',
    checkInDate: '2025-08-01T14:00:00Z',
    checkOutDate: '2025-08-07T10:00:00Z',
    numberOfGuests: 2,
    totalPrice: 920.50,
    offer: {
      title: 'Downtown Modern Apartment',
      addressCity: 'New York',
      addressCountry: 'USA',
      coverPhotoUrl: 'https://picsum.photos/seed/booking3/900/600'
    }
  },
  {
    id: 4,
    status: 'Completed',
    checkInDate: '2025-05-15T14:00:00Z',
    checkOutDate: '2025-05-18T10:00:00Z',
    numberOfGuests: 3,
    totalPrice: 450.00,
    offer: {
      title: 'Beachfront Studio',
      addressCity: 'Miami',
      addressCountry: 'USA',
      coverPhotoUrl: 'https://picsum.photos/seed/booking4/900/600'
    }
  }
];
