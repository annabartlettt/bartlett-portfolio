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
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "Describe what is in the image for someone who cannot see it. Not the same as the caption — say what is shown, not what it means.",
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "caption", media: "image" } },
});
