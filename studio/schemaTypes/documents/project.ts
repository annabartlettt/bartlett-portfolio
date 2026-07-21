import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "folderNumber", title: "Folder number", type: "string" }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "featured", type: "boolean" }),
    defineField({
      name: "priority",
      title: "Priority tier",
      type: "string",
      options: {
        list: [
          { title: "Flagship", value: "flagship" },
          { title: "Support", value: "support" },
          { title: "Archive", value: "archive" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }] }),
    defineField({
      name: "coverImage",
      title: "Cover / hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "invisibleSystem", title: "Invisible system ◆", type: "text", rows: 2 }),
    defineField({ name: "madeTangible", title: "Made tangible ◇", type: "text", rows: 2 }),
    defineField({
      name: "methods",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "method" }] })],
    }),
    defineField({
      name: "themeTags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "brand", title: "Brand colors", type: "brand" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "timeline", type: "string" }),
    defineField({ name: "team", type: "string" }),
    defineField({ name: "coverHeadline", type: "string" }),
    defineField({ name: "coverSub", title: "Cover subhead", type: "text", rows: 2 }),
    defineField({
      name: "sections",
      title: "Case study sections",
      type: "array",
      of: [defineArrayMember({ type: "section" })],
    }),
    defineField({
      name: "notes",
      title: "Case study notes",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  preview: {
    select: { title: "title", folder: "folderNumber" },
    prepare({ title, folder }) {
      return { title, subtitle: folder ? `Folder ${folder}` : "" };
    },
  },
});
