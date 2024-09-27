export default function RedditLogo({ className = "", color }: ImageIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 256 256"
      className={className}
      aria-label="Reddit logo"
    >
      <path
        className={color ? "" : "fill-primary"}
        fill={color || undefined}
        fillRule="evenodd"
        d="M0 128C0 57.31 57.31 0 128 0s128 57.31 128 128-57.31 128-128 128H18.54c-6.84 0-10.27-8.27-5.43-13.11l24.38-24.38C14.33 195.35 0 163.35 0 128Zm174.8-51.22c-10.09 0-18.54-7.01-20.76-16.42v.02c-12.24 1.73-21.68 12.27-21.68 24.97v.08c18.95.71 36.27 6.05 49.99 14.54a29.732 29.732 0 0 1 18.2-6.19c16.51 0 29.89 13.38 29.89 29.89 0 11.91-6.98 22.2-17.07 27-.94 34.73-38.8 62.67-85.31 62.67-46.51 0-84.32-27.91-85.31-62.61-10.17-4.77-17.21-15.09-17.21-27.07 0-16.51 13.38-29.89 29.89-29.89 6.88 0 13.22 2.33 18.27 6.24 13.6-8.43 30.73-13.77 49.49-14.56v-.11c0-17.73 13.47-32.36 30.72-34.21 2-9.71 10.59-17.01 20.89-17.01 11.78 0 21.33 9.55 21.33 21.33 0 11.78-9.55 21.33-21.33 21.33Zm-86.23 46.69c-8.37 0-15.57 8.32-16.07 19.16s6.83 15.25 15.21 15.25 14.63-3.94 15.13-14.78-5.9-19.63-14.27-19.63Zm95.06 19.16c-.49-10.84-7.69-19.16-16.07-19.16-8.38 0-14.77 8.79-14.27 19.63.5 10.85 6.76 14.78 15.13 14.78 8.37 0 15.71-4.41 15.21-15.25Zm-24.07 28.33c.61-1.46-.39-3.09-1.96-3.25-9.21-.93-19.15-1.44-29.54-1.44s-20.34.51-29.54 1.44c-1.57.16-2.57 1.79-1.96 3.25 5.16 12.31 17.31 20.96 31.5 20.96 14.19 0 26.35-8.65 31.5-20.96Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
