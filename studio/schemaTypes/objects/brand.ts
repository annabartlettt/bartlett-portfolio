import { defineType, defineField } from "sanity";

export const brand = defineType({
  name: "brand",
  title: "Brand Colors",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "primary", type: "string", description: "Hex, e.g. #363A5E" }),
    defineField({ name: "secondary", type: "string", description: "Hex" }),
    defineField({ name: "tint", type: "string", description: "Light background hex" }),
    defineField({ name: "onDark", type: "string", description: "Accent for dark backgrounds" }),
  ],
});
