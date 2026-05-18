import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { useAuth } from './useAuth';
import { mockConversations, mockMessagesByConversation } from '../mocks/chat';
import type {
  ChatMessage,
  ConversationSummary,
  GetConversationsParams,
  GetMessagesParams,
  PagedResult,
  SendMessageRequest,
} from '../models/ChatModels';

const ME_PLACEHOLDER = 'me';

const conversationsState: ConversationSummary[] = mockConversations.map((c) => ({ ...c }));
const messagesState: Record<number, ChatMessage[]> = Object.fromEntries(
  Object.entries(mockMessagesByConversation).map(([id, msgs]) => [id, msgs.map((m) => ({ ...m }))])
);

let version = 0;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const notify = () => {
  version += 1;
  listeners.forEach((l) => l());
};
const getSnapshot = () => version;

const remapMessageSenderId = (msg: ChatMessage, realId: string | undefined): ChatMessage =>
  realId && msg.senderId === ME_PLACEHOLDER ? { ...msg, senderId: realId } : msg;

export interface UseConversationsResult {
  data?: PagedResult<ConversationSummary>;
  isLoading: false;
  isError: false;
}

export const useConversations = (params: GetConversationsParams): UseConversationsResult => {
  const ver = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const { user } = useAuth();
  const { PageNumber = 1, PageSize = 20 } = params;

  return useMemo(() => {
    const items = conversationsState.map((c) => ({
      ...c,
      lastMessage: remapMessageSenderId(c.lastMessage, user?.id),
    }));
    const sorted = items.sort(
      (a, b) => new Date(b.lastMessage.sentAt).getTime() - new Date(a.lastMessage.sentAt).getTime()
    );
    const start = (PageNumber - 1) * PageSize;
    const slice = sorted.slice(start, start + PageSize);
    return {
      data: {
        items: slice,
        totalCount: sorted.length,
        pageNumber: PageNumber,
        pageSize: PageSize,
        totalPages: Math.max(1, Math.ceil(sorted.length / PageSize)),
      },
      isLoading: false as const,
      isError: false as const,
    };
  }, [ver, user?.id, PageNumber, PageSize]);
};

export interface UseChatMessagesResult {
  data?: PagedResult<ChatMessage>;
  isLoading: false;
  isFetching: false;
  isError: false;
}

export const useChatMessages = (
  conversationId: number,
  params: GetMessagesParams = {}
): UseChatMessagesResult => {
  const ver = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const { user } = useAuth();
  const { PageNumber = 1, PageSize = 50 } = params;

  return useMemo(() => {
    const all = (messagesState[conversationId] ?? []).map((m) => remapMessageSenderId(m, user?.id));
    const sorted = [...all].sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );
    const start = (PageNumber - 1) * PageSize;
    const items = sorted.slice(start, start + PageSize);
    return {
      data: {
        items,
        totalCount: sorted.length,
        pageNumber: PageNumber,
        pageSize: PageSize,
        totalPages: Math.max(1, Math.ceil(sorted.length / PageSize)),
      },
      isLoading: false as const,
      isFetching: false as const,
      isError: false as const,
    };
  }, [ver, conversationId, user?.id, PageNumber, PageSize]);
};

export interface UseSendMessageResult {
  mutate: (req: SendMessageRequest) => void;
  isPending: false;
}

export const useSendMessage = (): UseSendMessageResult => {
  const mutate = useCallback((req: SendMessageRequest) => {
    const list = messagesState[req.conversationId] ?? [];
    const nextId = list.reduce((max, m) => Math.max(max, m.id), 0) + 1;
    const newMessage: ChatMessage = {
      id: nextId,
      senderId: ME_PLACEHOLDER,
      content: req.content,
      sentAt: new Date().toISOString(),
      photos: [],
    };
    messagesState[req.conversationId] = [...list, newMessage];

    const conv = conversationsState.find((c) => c.id === req.conversationId);
    if (conv) {
      conv.lastMessage = newMessage;
      conv.isUnread = false;
    }
    notify();
  }, []);

  return { mutate, isPending: false };
};
