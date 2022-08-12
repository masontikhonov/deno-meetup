export const EventType = {
  NewMessage: 'new-message',
} as const;
export type EventType = typeof EventType[keyof typeof EventType];
