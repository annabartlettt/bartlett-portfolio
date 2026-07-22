import { defineType, defineField } from "sanity";

export const captionedImage = defineType({
  name: "captionedImage",
  title: "Visual",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "What goes here (label)",
      type: "string",
      description: "Which Figma visual belongs in this slot",
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "caption", media: "image" } },
});
