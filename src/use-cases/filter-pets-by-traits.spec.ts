import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetPetByTraitUseCase } from './filter-pets-by-traits'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetByTraitUseCase

describe('Get Pet By ID Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetByTraitUseCase(petsRepository)
  })

  it('should be able get pet by id', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'joihndoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: '',
      number: '',
    })

    await petsRepository.create({
      org_id: org.id,
      age: '4',
      breed: 'labrador',
      feature: 'carinhoso, amoroso e animado',
      city: 'RJ',
    })

    const pet = await petsRepository.create({
      org_id: org.id,
      age: '3',
      breed: 'golden',
      feature: 'carinhoso, alegre e rápido',
      city: 'SP',
    })

    const getPetByTrait = await sut.execute({ trait: 'alegre' })

    expect(getPetByTrait.pet[0].id).toEqual(pet.id)
  })
})
