import Chat from './chat/Chat.js';
import { Home } from './home/Home.js';

function App() {
  return (
    <Home>
      <Chat type='floating' />
    </Home>
  );
}

export default App;
