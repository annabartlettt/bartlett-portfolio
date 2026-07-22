import { project } from "./documents/project";
import { category } from "./documents/category";
import { method } from "./documents/method";
import { siteSettings } from "./documents/siteSettings";
import { section } from "./objects/section";
import { stat } from "./objects/stat";
import { drawer } from "./objects/drawer";
import { brand } from "./objects/brand";
import { captionedImage } from "./objects/captionedImage";

export const schemaTypes = [
  // documents
  project,
  category,
  method,
  siteSettings,
  // objects
  section,
  stat,
  drawer,
  brand,
  captionedImage,
];
