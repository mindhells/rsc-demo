let updateContentKey = (contentKey) => {
  console.error('updateContentKey called before it was set!', contentKey);
};

function generateKey() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const updateContent = () => {
  updateContentKey(generateKey());
};

export const setContentUpdater = (updater: (contentKey: string) => void) => {
  updateContentKey = updater;
};
