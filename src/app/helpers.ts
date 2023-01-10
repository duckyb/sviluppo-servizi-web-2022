export function cloneObject(o: object) {
  return JSON.parse(JSON.stringify(o))
}
