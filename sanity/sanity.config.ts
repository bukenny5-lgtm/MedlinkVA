import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { singletonTypes, structure } from "./structure";
import { generateCertificateNumberAction } from "./actions/generateCertificateNumber";
import { generateCertificatePdfAction } from "./actions/generateCertificatePdf";

const singletonDocumentActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "medlink-va",
  title: "Medlink VA Content",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  apiVersion: process.env.SANITY_STUDIO_API_VERSION ?? "2026-03-30",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !singletonTypes.has(template.templateId));
      }

      if (creationContext.type === "structure" && creationContext.schemaType && singletonTypes.has(creationContext.schemaType)) {
        return [];
      }

      return prev;
    },
    actions: (actions, context) => {
      if (context.schemaType === "certificate") {
        return [...actions, generateCertificateNumberAction, generateCertificatePdfAction];
      }
      if (!singletonTypes.has(context.schemaType)) {
        return actions;
      }

      return actions.filter((action) => singletonDocumentActions.has((action as { action?: string }).action ?? ""));
    },
  },
});
