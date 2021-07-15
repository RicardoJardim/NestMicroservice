export class TokenGenerator {
  private static instance: TokenGenerator;
  private constructor() {}

  public static getInstance(): TokenGenerator {
    if (!TokenGenerator.instance) {
      TokenGenerator.instance = new TokenGenerator();
    }
    return TokenGenerator.instance;
  }

  generateKey(): string {
    return `RandomKey${Math.floor(Math.random() * 200) + 50}Ola`;
  }
}
