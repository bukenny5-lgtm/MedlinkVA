import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchCmsBundle } from "../sanity/queries";
import type { CmsBundle } from "../sanity/types";

type SiteContentState = {
  bundle: CmsBundle | null;
};

const SiteContentContext = createContext<SiteContentState>({ bundle: null });

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<CmsBundle | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetchCmsBundle().then((result) => {
      if (!cancelled) {
        setBundle(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContentContext.Provider value={{ bundle }}>{children}</SiteContentContext.Provider>;
}

export function useCmsBundle() {
  return useContext(SiteContentContext).bundle;
}
