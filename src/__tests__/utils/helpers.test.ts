import { expect, test } from "vitest";
import { toTitleCase } from "@/utils/helpers";

test("toTitleCase", () => {
  expect(toTitleCase("john smith")).toEqual("John Smith");
  expect(toTitleCase("JOHN SMITH")).toEqual("John Smith");
});
