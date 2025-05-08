export default interface IHashPassordGenerator {
  hashGenerator(passwordText: string): Promise<string>;
  verify(passowrdText: string, hash: string): Promise<boolean>;
}
