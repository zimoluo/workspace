export function getNavigation(pathname: string): NavigationKey {
  const paths = {
    "/blog": "blog",
    "/projects": "projects",
    "/about": "about",
    "/management": "management",
    "/photos": "photos",
  };

  for (const [key, value] of Object.entries(paths)) {
    if (pathname.startsWith(key)) {
      return value as NavigationKey;
    }
  }
  return "home";
}