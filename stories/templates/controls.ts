// A select control offering exactly the values a prop's type allows: a missing or foreign value fails the type check.
type Every<T, U extends readonly T[]> = [Exclude<T, U[number]>] extends [never] ? U : never;

export const choice =
  <T extends string | number>() =>
  <const U extends readonly T[]>(...options: Every<T, U>) => ({
    control: { type: 'select' as const },
    options,
  });
