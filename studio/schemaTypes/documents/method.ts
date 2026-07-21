import { defineType, defineField } from "sanity";
import { ComposeIcon } from "@sanity/icons";

export const method = defineType({
  name: "method",
  title: "Method",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});
