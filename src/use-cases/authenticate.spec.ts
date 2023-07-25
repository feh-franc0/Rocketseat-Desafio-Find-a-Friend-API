import { expect, describe, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialErros } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'joihndoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: '',
      number: '',
    })

    const { org } = await sut.execute({
      email: 'joihndoe@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    expect(() =>
      sut.execute({
        email: 'joihndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErros)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new AuthenticateUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'John Doe',
      email: 'joihndoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: '',
      number: '',
    })

    expect(() =>
      sut.execute({
        email: 'joihndoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErros)
  })
})
