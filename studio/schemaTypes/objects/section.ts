import { defineType, defineField, defineArrayMember } from "sanity";

export const section = defineType({
  name: "section",
  title: "Case Study Section",
  type: "object",
  fields: [
    defineField({ name: "number", type: "string" }),
    defineField({ name: "kicker", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "rhythm",
      type: "string",
      options: {
        list: [
          { title: "Illustration", value: "illustration" },
          { title: "Data / stats", value: "data" },
          { title: "Artifact / product", value: "artifact" },
          { title: "Quiet / reflection", value: "reflection" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "accent",
      type: "string",
      description: "Hex color for this section's accent, e.g. #363A5E",
    }),
    defineField({ name: "image", title: "Legacy single image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "images",
      title: "Visuals — drop each Figma image into its labeled slot",
      type: "array",
      of: [defineArrayMember({ type: "captionedImage" })],
    }),
    defineField({
      name: "stats",
      type: "array",
      of: [defineArrayMember({ type: "stat" })],
    }),
    defineField({ name: "drawer", title: "Disclosure drawer", type: "drawer" }),
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
  },
});
