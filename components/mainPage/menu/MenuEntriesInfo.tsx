import Link from "next/link";

const currentYear = new Date().getFullYear();
const displayYear = currentYear > 2024 ? `2024-${currentYear}` : "2024";

export default function MenuEntriesInfo() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2.5 text-sm text-center">
      <p>Workspace v{process.env.version}</p>
      <p>
        &copy; {displayYear} Zimo Luo. All rights reserved.{" "}
        <Link
          target="_blank"
          href="https://github.com/zimoluo/workspace"
          className="hover:underline underline-offset-2"
        >
          Source
        </Link>
        &nbsp;and&nbsp;
        <Link
          target="_blank"
          href="https://github.com/zimoluo/workspace/releases"
          className="hover:underline underline-offset-2"
        >
          download
        </Link>
        &nbsp;available.
      </p>
      <p>
        Software released under{" "}
        <Link
          target="_blank"
          href="https://www.gnu.org/licenses/agpl-3.0.en.html"
          className="hover:underline underline-offset-2"
        >
          GNU&nbsp;AGPL&nbsp;3.0
        </Link>
        .{" "}
        <Link
          target="_blank"
          href="https://www.zimoluo.me/management/terms-of-use"
          className="hover:underline underline-offset-2"
        >
          Terms&nbsp;of&nbsp;Use
        </Link>{" "}
        apply.
      </p>
    </div>
  );
}
