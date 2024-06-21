import ChatFallback from '../components/chat/ChatFallback.js';
import { Home } from '../components/home/Home.js';

function Fallback({ message }: Readonly<{ message: string }>) {
  return (
    <Home>
      <ChatFallback message={message} />
    </Home>
  );
}

export default Fallback;
