declare module 'invariant' {
  function invariant(condition: any, format?: string, ...args: any[]): asserts condition;
  export default invariant;
}