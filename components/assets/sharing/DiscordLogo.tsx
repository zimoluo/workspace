export default function DiscordLogo({ className = "", color }: ImageIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      strokeMiterlimit={10}
      style={{
        fillRule: "nonzero",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }}
      viewBox="0 0 180 180"
      className={className}
      aria-label="Discord logo"
    >
      <path
        className={color ? "" : "fill-primary"}
        fill={color || undefined}
        d="M152.477 33.214a148.87 148.87 0 0 0-37.135-11.425 101.952 101.952 0 0 0-4.757 9.67 138.291 138.291 0 0 0-41.213 0 102.47 102.47 0 0 0-4.757-9.67 149.916 149.916 0 0 0-37.164 11.453C3.95 68.013-2.42 101.921.764 135.347a149.68 149.68 0 0 0 45.545 22.864 109.95 109.95 0 0 0 9.755-15.729 96.912 96.912 0 0 1-15.361-7.333 177.25 177.25 0 0 0 3.766-2.832 106.992 106.992 0 0 0 91.062 0 53.43 53.43 0 0 0 3.765 2.832 97.151 97.151 0 0 1-15.389 7.347 108.979 108.979 0 0 0 9.755 15.715 149.01 149.01 0 0 0 45.573-22.85c3.738-38.764-6.385-72.36-26.758-102.147ZM60.099 114.79c-8.877 0-16.21-8.056-16.21-17.966 0-9.91 7.078-18.037 16.181-18.037 9.104 0 16.38 8.127 16.225 18.037-.156 9.91-7.15 17.966-16.196 17.966Zm59.802 0c-8.891 0-16.197-8.056-16.197-17.966 0-9.91 7.079-18.037 16.197-18.037 9.117 0 16.337 8.127 16.182 18.037-.156 9.91-7.136 17.966-16.182 17.966Z"
      />
    </svg>
  );
}