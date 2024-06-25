import { buildClassName } from '../../utils/buildClassName.js';
import { IconButton } from '../iconButton/IconButton.js';
import { CloseIcon } from '../icons/CloseIcon.js';
import { MinimizeIcon } from '../icons/MinimizeIcon.js';

import styles from './ChatHeader.scss';

const COMPONENT_NAME = 'chat-header';

export interface ChatHeaderProps {
  className?: string;
}

export function ChatHeader({ className }: ChatHeaderProps) {
  return (
    <header
      className={buildClassName(
        styles[COMPONENT_NAME],
        className,
      )}
    >
      <IconButton icon={<MinimizeIcon />} aria-label="Minimize chat" />
      <IconButton icon={<CloseIcon />} aria-label="Close chat" />
    </header>
  );
}
