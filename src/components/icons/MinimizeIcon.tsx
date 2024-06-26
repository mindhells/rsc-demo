export interface MinimizeIconProps {
  className?: string;
}

export function MinimizeIcon({ className }: MinimizeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <title>Minimize</title>
      <path d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"/>
    </svg>
  );
}
