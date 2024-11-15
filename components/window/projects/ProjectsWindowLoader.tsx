import WindowDisplay from "@/components/widgets/WindowDisplay";
import ShareButtonArray from "@/components/widgets/ShareButtonArray";
import ProjectsHeader from "@/app/projects/ProjectsHeader";
import WindowReadingSettingsApplier from "../WindowReadingSettingsApplier";
import parseCustomMarkdown from "@/lib/markdownParser";
import clientWindowMarkdownComponentsMap from "@/lib/clientWindowMarkdownComponentsMap";
import EntryWindowLoader from "../EntryWindowLoader";

interface Props {
  slug: string;
}

export default function ProjectsWindowLoader({ slug }: Props) {
  return (
    <EntryWindowLoader<ProjectsEntry>
      slug={slug}
      entryType="projects/entries"
      entryFormat="json"
      fields={[
        "title",
        "slug",
        "description",
        "links",
        "date",
        "authors",
        "faviconFormat",
        "content",
        "images",
        "unlisted",
      ]}
      modifyEntry={(entry) => ({
        ...entry,
        content: (entry.content as unknown as string[]).join("\n") || "",
      })}
      renderContent={(entry) => (
        <WindowDisplay
          className="bg-widget-90"
          imageData={entry.images}
          display={
            <article className="w-full relative">
              <div className="absolute top-4 right-11 z-10">
                <ShareButtonArray
                  title={entry.title}
                  description={entry.description}
                  slug={slug}
                  section="projects"
                />
              </div>
              <div className="px-6 md:px-10 pt-4 md:pt-4 pb-6 md:pb-8">
                <ProjectsHeader {...entry} />
                <WindowReadingSettingsApplier slug={slug}>
                  {parseCustomMarkdown(
                    entry.content,
                    clientWindowMarkdownComponentsMap
                  )}
                </WindowReadingSettingsApplier>
              </div>
            </article>
          }
        />
      )}
    />
  );
}
