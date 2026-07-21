import { defineType, defineField, defineArrayMember } from "sanity";

export const drawer = defineType({
  name: "drawer",
  title: "Disclosure Drawer",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({
      name: "content",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});
