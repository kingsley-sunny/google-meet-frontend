// Function to convert an array to a Set
export function arrayToSet<T>(array: T[]): Set<T> {
  return new Set(array);
}

// Function to convert a Set to an array
export function setToArray<T>(set: Set<T | undefined>): (T | undefined)[] {
  return !set ? [] : Array.from(set);
}
