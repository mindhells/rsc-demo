import { faker } from '@faker-js/faker';

export class Chat {
  static #messages: string[] = [
    'Welcome to the chat!',
    'Please ask a question.',
  ];

  async ask(question: string) {
    Chat.#messages.push(question);
    const answer = faker.lorem.sentence(question.split(' ').length);
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500),
    );
    Chat.#messages.push(answer);
    return answer;
  }

  async getHistory() {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500),
    );
    return Chat.#messages;
  }
}
