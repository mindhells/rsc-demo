import { AsyncLocalStorage } from 'node:async_hooks';
import type { Chat } from './model/Chat.js';
export type AppContext = {
  chatModel: Chat;
};
export const appContextStore = new AsyncLocalStorage<AppContext>();
