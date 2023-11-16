export default function StarIcon({ className = "", color }: ImageIconProps) {
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
      viewBox="0 0 24 24"
      className={className}
      aria-label="Like this"
    >
      <path
        fill="none"
        className={color ? "" : "stroke-primary"}
        stroke={color || undefined}
        strokeWidth={1.4}
        d="M11.083 2.56c.29-.653.436-.979.638-1.08a.627.627 0 0 1 .558 0c.202.101.348.427.638 1.08l2.315 5.192c.086.192.129.289.195.363.059.065.13.117.211.153.09.04.196.051.406.073l5.653.597c.71.075 1.065.113 1.223.274.137.14.2.336.172.53-.033.224-.298.463-.828.94l-4.223 3.807c-.157.14-.235.211-.285.297a.628.628 0 0 0-.08.248c-.01.1.011.202.055.409l1.18 5.561c.147.698.221 1.047.117 1.248a.628.628 0 0 1-.451.328c-.223.037-.532-.141-1.15-.498l-4.925-2.84c-.183-.105-.274-.158-.372-.179a.63.63 0 0 0-.26 0c-.098.02-.189.074-.372.179l-4.924 2.84c-.619.357-.928.535-1.15.498a.627.627 0 0 1-.452-.328c-.104-.2-.03-.55.118-1.248l1.18-5.561c.043-.207.065-.31.055-.409a.627.627 0 0 0-.081-.248c-.05-.085-.128-.156-.285-.297l-4.223-3.806c-.53-.478-.795-.717-.828-.94a.628.628 0 0 1 .172-.531c.158-.161.513-.199 1.223-.274l5.654-.597c.21-.022.314-.033.405-.073a.627.627 0 0 0 .211-.153c.066-.074.11-.17.195-.363l2.315-5.193Z"
      />
    </svg>
  );
}
