import { decodeReply } from 'react-server-dom-webpack/server';
import { getRelativeSourcePath } from './fileManager.js';
import { withContext } from './withContext.js';

export async function runServerAction(serverReference: string, data: object) {
  const [filepath, name] = serverReference.split('#');
  const url = getRelativeSourcePath(filepath, 'actions');
  const action = (await import(`../actions/${url}`))[name];
  // Validate that this is actually a function we intended to expose and
  // not the client trying to invoke arbitrary functions. In a real app,
  // you'd have a manifest verifying this before even importing it.
  if (action.$$typeof !== Symbol.for('react.server.reference')) {
    throw new Error('Invalid action');
  }
  // Convert the parsed body to a FormData object, as that's what decodeReply
  // requires.
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value.value);
  }
  const reply = decodeReply(formData);
  const args = await reply;
  return withContext(() => {
    return action(...args);
  });
}
