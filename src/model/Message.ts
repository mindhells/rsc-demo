export type Sender = 'assistant' | 'user';

export type MessagePayload = {
  sender: Sender;
  text: string;
  url?: string;
  timestamp?: Date;
  pending?: boolean;
};

export class Message {
  timestamp = new Date();

  constructor(
    public sender: Sender,
    public text: string,
    public url?: string,
  ) {}

  static assistant(text: string, url?: string) {
    return new Message('assistant', text, url);
  }

  static user(text: string, url?: string) {
    return new Message('user', text, url);
  }

  toJSON(): MessagePayload {
    return {
      sender: this.sender,
      text: this.text,
      url: this.url,
      timestamp: this.timestamp,
    };
  }
}
