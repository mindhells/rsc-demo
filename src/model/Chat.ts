import { faker } from '@faker-js/faker';
import { Message } from './Message.js';

export class Chat {
  static #messages: Message[] = [Message.assistant('Welcome to the chat!')];

  async ask(question: string) {
    const questionMessage = Message.user(question);
    Chat.#messages.push(questionMessage);
    const answer = faker.lorem.sentence(question.split(' ').length);
    const answerMessage = Message.assistant(answer);
    Chat.#messages.push(answerMessage);
    await randomIdle();
    return [questionMessage, answerMessage];
  }

  async getHistory() {
    await randomIdle();
    return Chat.#messages.map((message) => message.toJSON());
  }
}

async function randomIdle() {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 500),
  );
}
