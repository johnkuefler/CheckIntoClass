import isValidEmail from "@/lib/isVadlidEmail";

describe("isValidEmail", () => {
  it("should return true for john@test.com", () => {
    const email = "john@test.com";
    expect(isValidEmail(email)).toBe(true);
  });

  it("should return false for john.test@com", () => {
    const email = "john.test@com";
    expect(isValidEmail(email)).toBe(false);
  });

  it("should return false for john@test", () => {
    const email = "john@test";
    expect(isValidEmail(email)).toBe(false);
  });
  
  it("should return false for johntest.com", () => {
    const email = "johntest.com";
    expect(isValidEmail(email)).toBe(false);
  });

  it("should return true for john@gus.pittstate.edu", () => {
    const email = "john@gus.pittstate.edu";
    expect(isValidEmail(email)).toBe(true);
  });

  it("should return true for a@b.com", () => {
    const email = "a@b.com";
    expect(isValidEmail(email)).toBe(true);
  });

  it("should return true for john@ukgov.co.uk", () => {
    const email = "john@ukgov.co.uk";
    expect(isValidEmail(email)).toBe(true);
  });

  it("should return false for ' john@test.com '", () => {
    expect(isValidEmail(' john@test.com ')).toBe(false);
  });
  
  it("should return true for 'john+doe@test.com'", () => {
    expect(isValidEmail('john+doe@test.com')).toBe(true);
  });
  
  it("should return true for 'john.中文@test.com'", () => {
    expect(isValidEmail('john.中文@test.com')).toBe(true);
  });
  
  it("should return false for '' (empty string)", () => {
    expect(isValidEmail('')).toBe(false);
  });
  
  it("should return false for null", () => {
    expect(isValidEmail(null)).toBe(false);
  });
  
  it("should return false for 'john@test@test.com'", () => {
    expect(isValidEmail('john@test@test.com')).toBe(false);
  });
});
