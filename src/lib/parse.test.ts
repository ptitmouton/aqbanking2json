import { expect, test } from "bun:test";
import { parse } from "./parse";

test("parse simple values", () => {
  const content = `int age="25"`;
  const parent: Record<string, any> = {};
  const result = parse(content, parent);
  expect(result.age).toBe(25);
});

test("parse char values", () => {
  const content = `char name="John%20Doe"`;
  const parent: Record<string, any> = {};
  const result = parse(content, parent);
  expect(result.name).toBe("John Doe");
});

test("parse nested object", () => {
  const content = `person {
        int age="30"
        char name="Alice"
    } #person`;
  const parent: Record<string, any> = {};
  const result = parse(content, parent);
  expect(result.person.age).toBe(30);
  expect(result.person.name).toBe("Alice");
});

test("parse list", () => {
  const content = `itemList {
        item {
            int id="1"
            char name="First"
        } #item
        item {
            int id="2"
            char name="Second"
        } #item
    } #itemList`;
  const parent: Record<string, any> = {};
  const result = parse(content, parent);

  expect(Array.isArray(result.item)).toBe(true);
  expect(result.item.length).toBe(2);
  expect(result.item[0].id).toBe(1);
  expect(result.item[0].name).toBe("First");
  expect(result.item[1].id).toBe(2);
  expect(result.item[1].name).toBe("Second");
});
