declare module 'mockjs-lite' {
  type Mock = (data: string) => string;

  interface Use {}

  interface Random {}

  interface MockJsLite {
    mock: Mock;
    use: Use;
    Random: Random;
  }

  const mock: MockJsLite;

  export default mock;
}
