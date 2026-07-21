import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const category = defineType({
  name: "category",
  title: "Category (Invisible System)",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});
