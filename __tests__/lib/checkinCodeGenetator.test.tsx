import generateRandomCode from "@/lib/checkinCodeGenerator";

describe('generateRandomCode', () => {
  it('should return a six-character string', () => {
    const code = generateRandomCode();
    expect(code).toHaveLength(6);
  });

  it('should only contain uppercase letters and numbers', () => {
    const code = generateRandomCode();
    expect(code).toMatch(/^[A-Z0-9]{6}$/);
  });

  it('should generate different codes on subsequent calls', () => {
    const code1 = generateRandomCode();
    const code2 = generateRandomCode();
    expect(code1).not.toEqual(code2);
  });
});
