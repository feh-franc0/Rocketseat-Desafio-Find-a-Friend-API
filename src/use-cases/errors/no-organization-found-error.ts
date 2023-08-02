export class NoOrgsFoundError extends Error {
  constructor() {
    super('No organization found.')
  }
}
