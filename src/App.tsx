import { AppRoutes } from "./routes/AppRoutes";
import { SiteContentProvider } from "./lib/cms/SiteContentProvider";

export default function App() {
  return (
    <SiteContentProvider>
      <AppRoutes />
    </SiteContentProvider>
  );
}

