import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },

  server: {
    hostname: "localhost",
    port: 3333,
  },

  deployment: {
    appId: "pu1bh35j7fyexs3dzkw88maf",
  },
});