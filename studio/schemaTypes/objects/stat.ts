import { defineType, defineField } from "sanity";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string" }),
    defineField({ name: "label", type: "string" }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
