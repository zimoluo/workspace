"id random";

export default function ManagementIcon({
  color = null,
  className = "",
  height,
  width,
}: ImageIconProps) {
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
      viewBox="0 0 192 192"
      aria-label="Navigate to management page"
      height={height ? height : undefined}
      width={width ? width : undefined}
      className={className}
    >
      <circle
        cx={96}
        cy={96}
        r={91}
        className={color ? "" : "stroke-primary"}
        stroke={color || undefined}
        strokeWidth={7.5}
        fill="none"
      />
      <path
        className={color ? "" : "fill-primary"}
        fill={color || undefined}
        d="M72.073 46.662c-6.644.004-12.016 5.408-12.016 12.052v62.556h-3.782c-6.64 0-12.016 5.376-12.016 12.016 0 6.641 5.375 12.052 12.016 12.052h63.652c6.635-.008 12.008-5.381 12.016-12.016V70.73h3.782c6.638-.008 12.012-5.378 12.016-12.016-.004-6.641-5.375-12.048-12.016-12.052H72.073Zm0 8.27h52.201a12.175 12.175 0 0 0-.601 3.782l.035 74.608a3.73 3.73 0 0 1-3.145 3.675 3.746 3.746 0 0 1-4.17-2.474 3.758 3.758 0 0 1 1.767-4.524c1.695-1.151 2.418-3.265 1.838-5.23-.497-2.061-2.334-3.523-4.454-3.499H68.327V58.714c-.006-1.156.501-2.26 1.413-2.97h.036a3.706 3.706 0 0 1 2.297-.812Zm63.652 0c2.077.004 3.742 1.705 3.746 3.782a3.741 3.741 0 0 1-3.746 3.746h-3.782v-3.746a3.743 3.743 0 0 1 1.449-2.97 3.777 3.777 0 0 1 2.333-.812ZM56.31 129.54h52.201a12.02 12.02 0 0 0 0 7.528H56.275c-2.062-.019-3.746-1.68-3.746-3.746a3.795 3.795 0 0 1 3.781-3.782Z"
      />
      <path
        className={color ? "" : "fill-primary"}
        fill={color || undefined}
        d="M78.583 76.095a2.707 2.707 0 0 1 2.707-2.707h29.42a2.707 2.707 0 0 1 2.707 2.707v.896a2.707 2.707 0 0 1-2.707 2.707H81.29a2.707 2.707 0 0 1-2.707-2.707v-.896Zm0 12.339a2.685 2.685 0 0 1 2.684-2.685h29.18a2.684 2.684 0 0 1 2.684 2.685v.889a2.684 2.684 0 0 1-2.684 2.684h-29.18a2.685 2.685 0 0 1-2.684-2.684v-.89Zm0 12.875a2.707 2.707 0 0 1 2.707-2.706h29.42a2.707 2.707 0 0 1 2.707 2.706v.897a2.707 2.707 0 0 1-2.707 2.706H81.29a2.707 2.707 0 0 1-2.707-2.706v-.897Z"
      />
    </svg>
  );
}
