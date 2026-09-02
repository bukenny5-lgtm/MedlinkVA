import { ContentPage } from "../components/ui/ContentPage";
import { pageContent } from "../content/pages";

export function NotFoundPage() {
  return <ContentPage page={pageContent.notFound} seoTitle="Page not found" robots="noindex,nofollow" />;
}

