import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Anna Bartlett Portfolio",
  projectId: "rhkuh6nb",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
