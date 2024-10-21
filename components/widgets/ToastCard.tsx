import { enrichTextContent } from "@/lib/lightMarkUpProcessor";
import CogIcon from "../assets/toast/CogIcon";
import CommentRingIcon from "../assets/toast/CommentRingIcon";
import toastStyle from "./toast.module.css";
import DisplayFavicon from "../assets/DisplayFavicon";
import ManagementIcon from "../assets/navigation/ManagementIcon";
import CommandKeyIcon from "../assets/entries/CommandKeyIcon";

type Props = ToastEntry & { className?: string };

export const toastIconMap: Record<ToastIcon, typeof CogIcon> = {
  generic: DisplayFavicon,
  comment: CommentRingIcon,
  settings: CogIcon,
  management: ManagementIcon,
  themeMaker: (props: ImageIconProps) => (
    <CommandKeyIcon strokeWidth={44} {...props} />
  ),
};

export default function ToastCard({
  icon = "generic",
  title,
  description = "",
  className = "",
}: Props) {
  const ToastIcon = toastIconMap[icon];

  return (
    <div
      className={`rounded-full md:rounded-2xl bg-widget-100 md:bg-widget-80 backdrop-blur-2xl flex border-opacity-75 border-0.8 border-saturated text-sm md:text-base ${toastStyle.sizing} px-2 py-1 md:py-1.5 md:shadow ${className}`}
    >
      <div className="shrink-0 w-auto h-full ml-1.5 md:ml-2 mr-2.5 md:mr-3 flex items-center justify-center">
        <ToastIcon className={`${toastStyle.icon} w-auto aspect-square`} />
      </div>
      <div className="flex flex-col justify-center items-start flex-grow overflow-hidden">
        <h3 className={`font-bold ${description ? "whitespace-nowrap" : ""}`}>
          {title}
        </h3>
        {description && (
          <p className="md:flex-grow">{enrichTextContent(description)}</p>
        )}
      </div>
    </div>
  );
}
