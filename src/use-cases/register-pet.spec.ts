import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRegistryCreateUseCase } from './register-pet'

let petsRepository: InMemoryPetsRepository
let sut: PetRegistryCreateUseCase

describe('Pet Registry Create Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new PetRegistryCreateUseCase(petsRepository)
  })

  it('should be able to create a record of a pet', async () => {
    const { pet } = await sut.execute({
      org_id: 'org-01',
      name: 'max',
      breed: 'pastor alemao',
      age: '3',
      city: 'sp',
      feature: 'pelo preto e carinhoso',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
