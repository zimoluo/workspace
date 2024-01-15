export default function CogIcon({ className = "", color }: ImageIconProps) {
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
      viewBox="0 0 1024 1024"
      className={className}
      aria-label="Cog icon"
    >
      <g
        fill="none"
        className={color ? "" : "stroke-primary"}
        stroke={color || undefined}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeWidth={48}
      >
        <path d="M366.179 512c0-80.535 65.287-145.821 145.821-145.821 80.535 0 145.822 65.286 145.822 145.821S592.535 657.821 512 657.821 366.179 592.535 366.179 512Z" />
        <path d="M597.811 33.33c-17.868-7.4-40.514-7.4-85.811-7.4s-67.943 0-85.811 7.4a97.22 97.22 0 0 0-52.61 52.611c-4.504 10.874-6.267 23.52-6.957 41.966-1.013 27.107-14.915 52.199-38.408 65.762-23.492 13.563-52.172 13.056-76.155.381-16.319-8.626-28.152-13.423-39.821-14.959a97.22 97.22 0 0 0-71.87 19.257c-15.341 11.772-26.665 31.386-49.313 70.613s-33.972 58.842-36.496 78.014a97.22 97.22 0 0 0 19.258 71.87c7.163 9.337 17.232 17.182 32.858 27.001 22.973 14.436 37.753 39.026 37.752 66.154s-14.782 51.713-37.752 66.144c-15.629 9.824-25.699 17.674-32.863 27.011a97.2 97.2 0 0 0-19.257 71.866c2.523 19.171 13.847 38.788 36.495 78.014 22.649 39.226 33.973 58.844 49.313 70.612a97.23 97.23 0 0 0 71.87 19.258c11.668-1.536 23.5-6.334 39.819-14.957 23.984-12.676 52.667-13.182 76.16.38 23.494 13.566 37.397 38.657 38.41 65.77.69 18.441 2.453 31.089 6.957 41.962a97.23 97.23 0 0 0 52.61 52.613c17.868 7.398 40.514 7.398 85.811 7.398s67.943 0 85.811-7.398a97.22 97.22 0 0 0 52.608-52.613c4.506-10.873 6.27-23.521 6.96-41.967 1.011-27.108 14.913-52.199 38.405-65.765 23.491-13.567 52.174-13.056 76.162-.38 16.317 8.623 28.148 13.416 39.814 14.952a97.2 97.2 0 0 0 71.871-19.253c15.34-11.773 26.665-31.386 49.311-70.617 22.651-39.225 33.977-58.838 36.499-78.009a97.22 97.22 0 0 0-19.258-71.87c-7.164-9.338-17.236-17.188-32.863-27.007-22.967-14.431-37.748-39.021-37.748-66.149 0-27.127 14.781-51.708 37.748-66.139 15.632-9.824 25.703-17.669 32.868-27.011a97.22 97.22 0 0 0 19.258-71.867c-2.522-19.172-13.848-38.786-36.499-78.013-22.646-39.228-33.971-58.842-49.312-70.613a97.2 97.2 0 0 0-71.87-19.257c-11.666 1.536-23.497 6.332-39.819 14.957-23.983 12.676-52.666 13.183-76.157-.382-23.497-13.563-37.399-38.657-38.41-65.766-.69-18.444-2.454-31.09-6.96-41.963a97.2 97.2 0 0 0-52.608-52.612Z" />
      </g>
    </svg>
  );
}