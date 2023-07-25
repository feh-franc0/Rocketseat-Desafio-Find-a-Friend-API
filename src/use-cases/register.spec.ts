import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      address: 'rua john 123',
      number: '21 9 1020-3040',
      email: 'joihndoe@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      address: 'rua john 123',
      number: '21 9 1020-3040',
      email: 'joihndoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      address: 'rua john 123',
      number: '21 9 1020-3040',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        address: 'rua john 123',
        number: '21 9 1020-3040',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
