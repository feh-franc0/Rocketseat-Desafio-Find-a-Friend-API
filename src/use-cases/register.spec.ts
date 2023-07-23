import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          address: data.address,
          number: data.number,
          password_hash: data.password_hash,
        }
      },
    })

    const { org } = await registerUseCase.execute({
      name: 'John Doe',
      address: 'rua john 123',
      number: '21 9 1020-3040',
      email: 'joihndoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
