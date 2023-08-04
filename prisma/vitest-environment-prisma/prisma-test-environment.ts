import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('before exec')

    return {
      async teardown() {
        console.log('after exec. ')
      },
    }
  },
}
