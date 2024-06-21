import { buildClassName } from '../../utils/buildClassName.js';

import styles from './Spinner.scss';

const COMPONENT_NAME = 'spinner';

export type SpinnerProps = {
  size?: 'large';
  variant?: 'light';
};

function Spinner({size, variant}: SpinnerProps) {
  return (
    <div className={buildClassName(
      styles[COMPONENT_NAME],
      styles[`${COMPONENT_NAME}--${size}`],
      styles[`${COMPONENT_NAME}--${variant}`],
    )} />
  );
}

export default Spinner;
