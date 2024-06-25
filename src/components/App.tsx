import Chat from './chat/Chat.js';
import { Home } from './home/Home.js';

function App() {
  return (
    <Home>
      <Chat position='floating' />
    </Home>
  );
}

export default App;
