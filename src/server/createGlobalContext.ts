import { Chat } from '../model/Chat.js';

export function createGlobalContext() {
  return { chatModel: new Chat() };
}
