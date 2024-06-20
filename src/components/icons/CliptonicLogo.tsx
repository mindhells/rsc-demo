export interface CliptonicLogoProps {
  className?: string;
}

export function CliptonicLogo({ className }: CliptonicLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 132 141"
      className={className}
    >
      <title>Cliptonic</title>
      <desc>Softonic</desc>
      <path
        d="M39.757 105.959 4.89 71.379a16.46 16.46 0 0 1 0-23.415L48.36 4.849c6.518-6.465 17.09-6.465 23.609 0l34.867 34.58-67.08 66.53Z"
        fill="#26D07C"
      />
      <path
        d="m14.189 105.941 30.46 30.209c6.519 6.467 17.089 6.467 23.608 0l43.471-43.113a16.46 16.46 0 0 0 0-23.414l-30.459-30.21-67.08 66.528Z"
        fill="#00A3E0"
      />
      <path
        d="m106.836 39.414-12.785 12.68-12.785-12.68h25.57Z"
        fill="#005587"
      />
    </svg>
  );
}
