import type {
  ChatMessage,
  ConversationSummary,
  CURRENT_USER_PLACEHOLDER_ID,
} from '../models/ChatModels';

const ME: typeof CURRENT_USER_PLACEHOLDER_ID = 'me';

const daysAgo = (days: number, hours = 0, minutes = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

const hoursAgo = (hours: number, minutes = 0) => {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  d.setMinutes(d.getMinutes() + minutes);
  return d.toISOString();
};

export const mockConversations: ConversationSummary[] = [
  {
    id: 1,
    recipient: {
      id: 'host-1',
      fullName: 'Anna Kowalska',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=47',
    },
    lastMessage: {
      id: 105,
      senderId: 'host-1',
      content: 'Great, looking forward to hosting you! Let me know if you have any questions.',
      sentAt: hoursAgo(1, 15),
      photos: [],
    },
    isUnread: true,
    context: {
      type: 'Booking',
      bookingId: 11,
      bookingTitle: 'Sunny loft in Krakow',
      reviewId: null,
      checkInDate: daysAgo(-21, 15),
      checkOutDate: daysAgo(-25, 11),
    },
  },
  {
    id: 2,
    recipient: {
      id: 'host-2',
      fullName: 'Marek Nowak',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=12',
    },
    lastMessage: {
      id: 207,
      senderId: ME,
      content: 'Perfect, thank you! See you on Friday.',
      sentAt: hoursAgo(3, 0),
      photos: [],
    },
    isUnread: false,
    context: {
      type: 'Booking',
      bookingId: 22,
      bookingTitle: 'Cozy seaside cabin',
      reviewId: null,
      checkInDate: daysAgo(-3, 14),
      checkOutDate: daysAgo(-6, 11),
    },
  },
  {
    id: 3,
    recipient: {
      id: 'host-3',
      fullName: 'Julia Wiśniewska',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=32',
    },
    lastMessage: {
      id: 308,
      senderId: 'host-3',
      content: 'Of course, early check-in at 12:00 works for us.',
      sentAt: daysAgo(1, 19, 30),
      photos: [],
    },
    isUnread: true,
    context: {
      type: 'Booking',
      bookingId: 33,
      bookingTitle: 'Modern studio downtown',
      reviewId: null,
      checkInDate: daysAgo(-10, 12),
      checkOutDate: daysAgo(-13, 11),
    },
  },
  {
    id: 4,
    recipient: {
      id: 'host-4',
      fullName: 'Piotr Lewandowski',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=15',
    },
    lastMessage: {
      id: 401,
      senderId: 'host-4',
      content: 'Thanks for the lovely review!',
      sentAt: daysAgo(2, 18, 5),
      photos: [],
    },
    isUnread: false,
    context: {
      type: 'Review',
      bookingId: 44,
      bookingTitle: 'Mountain view chalet',
      reviewId: 4001,
    },
  },
  {
    id: 5,
    recipient: {
      id: 'host-5',
      fullName: 'Karolina Zielińska',
      profilePictureUrl: 'https://i.pravatar.cc/150?img=20',
    },
    lastMessage: {
      id: 502,
      senderId: ME,
      content: 'Hi! Is parking included with the apartment?',
      sentAt: daysAgo(4, 10, 45),
      photos: [],
    },
    isUnread: false,
    context: {
      type: 'Booking',
      bookingId: 55,
      bookingTitle: 'Riverside apartment',
      reviewId: null,
      checkInDate: daysAgo(-30, 15),
      checkOutDate: daysAgo(-33, 11),
    },
  },
];

export const mockMessagesByConversation: Record<number, ChatMessage[]> = {
  1: [
    { id: 101, senderId: ME, content: 'Hi Anna! Just confirming our arrival around 4pm.', sentAt: daysAgo(0, 9, 12), photos: [] },
    { id: 102, senderId: 'host-1', content: 'Hello! That works perfectly. The lockbox code is 1456.', sentAt: daysAgo(0, 9, 20), photos: [] },
    { id: 103, senderId: ME, content: 'Awesome, thank you. Any food recommendations nearby?', sentAt: hoursAgo(2, 0), photos: [] },
    { id: 104, senderId: 'host-1', content: 'Definitely try Pierogarnia on Florianska — best pierogi in town!', sentAt: hoursAgo(1, 30), photos: [] },
    { id: 105, senderId: 'host-1', content: 'Great, looking forward to hosting you! Let me know if you have any questions.', sentAt: hoursAgo(1, 15), photos: [] },
  ],
  2: [
    { id: 201, senderId: 'host-2', content: 'Welcome! Your booking is confirmed.', sentAt: daysAgo(2, 11, 0), photos: [] },
    { id: 202, senderId: ME, content: 'Thanks! Could we get an extra towel set?', sentAt: daysAgo(2, 11, 30), photos: [] },
    { id: 203, senderId: 'host-2', content: 'Of course, I will leave them in the bathroom cupboard.', sentAt: daysAgo(2, 12, 5), photos: [] },
    { id: 204, senderId: ME, content: 'Great, appreciate it!', sentAt: daysAgo(2, 12, 10), photos: [] },
    { id: 205, senderId: 'host-2', content: 'Check-in is contactless — code 9981.', sentAt: daysAgo(1, 16, 45), photos: [] },
    { id: 206, senderId: 'host-2', content: 'Have a safe trip!', sentAt: hoursAgo(4, 0), photos: [] },
    { id: 207, senderId: ME, content: 'Perfect, thank you! See you on Friday.', sentAt: hoursAgo(3, 0), photos: [] },
  ],
  3: [
    { id: 301, senderId: ME, content: 'Hi Julia, would early check-in at noon be possible?', sentAt: daysAgo(2, 18, 0), photos: [] },
    { id: 302, senderId: 'host-3', content: 'Let me check with cleaning — give me 10 minutes.', sentAt: daysAgo(2, 18, 5), photos: [] },
    { id: 303, senderId: 'host-3', content: 'Yes, the place will be ready by 12:00.', sentAt: daysAgo(2, 18, 25), photos: [] },
    { id: 304, senderId: ME, content: 'Wonderful, thanks so much!', sentAt: daysAgo(2, 18, 40), photos: [] },
    { id: 305, senderId: 'host-3', content: 'No problem at all.', sentAt: daysAgo(2, 18, 45), photos: [] },
    { id: 306, senderId: ME, content: 'One more thing — is the Wi-Fi password somewhere?', sentAt: daysAgo(1, 19, 10), photos: [] },
    { id: 307, senderId: 'host-3', content: 'On the fridge magnet! :)', sentAt: daysAgo(1, 19, 25), photos: [] },
    { id: 308, senderId: 'host-3', content: 'Of course, early check-in at 12:00 works for us.', sentAt: daysAgo(1, 19, 30), photos: [] },
  ],
  4: [
    { id: 401, senderId: 'host-4', content: 'Thanks for the lovely review!', sentAt: daysAgo(2, 18, 5), photos: [] },
    { id: 402, senderId: ME, content: 'You\u2019re very welcome — the stay was excellent.', sentAt: daysAgo(2, 18, 10), photos: [] },
  ],
  5: [
    { id: 501, senderId: ME, content: 'Hi Karolina, looking forward to the stay!', sentAt: daysAgo(5, 9, 0), photos: [] },
    { id: 502, senderId: ME, content: 'Hi! Is parking included with the apartment?', sentAt: daysAgo(4, 10, 45), photos: [] },
  ],
};
