import { faker } from '@faker-js/faker';
import { Message } from './Message.js';

export class Chat {
  static #messages: Message[] = [Message.assistant('Welcome to the chat!')];

  async ask(question: string) {
    Chat.#messages.push(Message.user(question));
    const answer = faker.lorem.sentence(question.split(' ').length);
    await randomIdle();
    Chat.#messages.push(Message.assistant(answer));
    return answer;
  }

  async getHistory() {
    await randomIdle();
    return Chat.#messages;
  }
}

async function randomIdle() {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 500),
  );
}
