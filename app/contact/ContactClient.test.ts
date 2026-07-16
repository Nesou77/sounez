import { describe, expect, it } from "vitest";
import { validate, type FormState } from "./ContactClient";

function baseForm(overrides: Partial<FormState> = {}): FormState {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    topic: "Feedback",
    message: "This is a perfectly reasonable message about the site.",
    ...overrides,
  };
}

describe("contact form validate()", () => {
  it("accepts a fully valid submission", () => {
    expect(validate(baseForm())).toEqual({});
  });

  it("rejects an empty name", () => {
    expect(validate(baseForm({ name: "" })).name).toBeDefined();
  });

  it("rejects a name over 100 characters", () => {
    expect(validate(baseForm({ name: "a".repeat(101) })).name).toBeDefined();
  });

  it("rejects an empty email", () => {
    expect(validate(baseForm({ email: "" })).email).toBeDefined();
  });

  it("rejects a malformed email", () => {
    expect(validate(baseForm({ email: "not-an-email" })).email).toBeDefined();
  });

  it("rejects a message shorter than 10 characters", () => {
    expect(validate(baseForm({ message: "too short" })).message).toBeDefined();
  });

  it("rejects a message longer than 2000 characters", () => {
    expect(validate(baseForm({ message: "a".repeat(2001) })).message).toBeDefined();
  });

  it("accepts a message at exactly the 10-character minimum", () => {
    expect(validate(baseForm({ message: "a".repeat(10) })).message).toBeUndefined();
  });
});
