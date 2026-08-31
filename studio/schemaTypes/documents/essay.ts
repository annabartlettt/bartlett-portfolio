import { defineType, defineField, defineArrayMember } from "sanity";
import { EditIcon } from "@sanity/icons";

export const essay = defineType({
  name: "essay",
  title: "Essay",
  type: "document",
  icon: EditIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dek",
      title: "Dek (standfirst)",
      description: "One or two sentences under the headline.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "publishedAt", title: "Date", type: "date" }),
    defineField({
      name: "status",
      type: "string",
      initialValue: "published",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft (hidden from the index)", value: "draft" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "credit",
      title: "Where it came from",
      description:
        "Optional provenance line, e.g. 'Written on assignment' or 'Originally pitched to Byline by Byline'.",
      type: "string",
    }),
    defineField({
      name: "topics",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "relatedProject",
      title: "Related folder",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "caption", type: "string" }),
        defineField({ name: "alt", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Section heading", value: "h2" },
            { title: "Pull quote", value: "blockquote" },
          ],
        }),
        defineArrayMember({ type: "captionedImage" }),
      ],
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", status: "status" },
    prepare({ title, date, status }) {
      return {
        title,
        subtitle: [status === "draft" ? "DRAFT" : null, date].filter(Boolean).join(" · "),
      };
    },
  },
});
