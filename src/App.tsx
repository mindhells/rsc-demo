import Button from './components/Button.client.js';
import Chat from './components/Chat.js';

import styles from './App.scss';

const App = () => {
  return (
    <main className={styles.app}>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <Chat />
      <Button />
    </main>
  );
};

export default App;
