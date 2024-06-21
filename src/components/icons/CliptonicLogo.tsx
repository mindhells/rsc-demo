export interface CliptonicLogoProps {
  className?: string;
}

export function CliptonicLogo({ className }: CliptonicLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 117 141"
      className={className}
    >
      <title>Brand logo</title>
      <path fill="#26D07C" d="m39.8 106-35-34.6a16.5 16.5 0 0 1 0-23.4L48.5 4.8c6.5-6.4 17-6.4 23.6 0l34.8 34.6-67 66.6Z"/>
      <path fill="#00A3E0" d="m14.2 106 30.4 30.2c6.6 6.4 17.1 6.4 23.7 0L111.7 93a16.5 16.5 0 0 0 0-23.4L81.3 39.4 14.2 106Z"/>
      <path fill="#005587" d="M106.8 39.4 94.1 52.1 81.3 39.4h25.5Z"/>
    </svg>
  );
}
