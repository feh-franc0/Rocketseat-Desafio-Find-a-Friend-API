import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { AdoptedUseCase } from './adopted'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: AdoptedUseCase

describe('Adopted Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new AdoptedUseCase(petsRepository)
  })

  it('should be able to set pet as adopted', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'joihndoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: '',
      number: '',
      role: 'ADMIN',
    })

    const pet = await petsRepository.create({
      org_id: org.id,
      age: '4',
      breed: 'labrador',
      feature: 'agitado',
      city: 'RJ',
      adopted: false,
    })

    const petAdopted = await sut.execute({ id: pet.id })

    expect(petAdopted.pet).toEqual(
      expect.objectContaining({
        adopted: true,
      }),
    )
  })
})
