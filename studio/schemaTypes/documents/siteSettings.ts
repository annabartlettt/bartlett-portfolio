import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({
      name: "about",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "thinking",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "link",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "url", type: "url" }),
          ],
        }),
      ],
    }),
  ],
});
