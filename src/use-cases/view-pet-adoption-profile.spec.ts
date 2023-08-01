import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ViewPetAdoptionProfileUseCase } from './view-pet-adoption-profile'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: ViewPetAdoptionProfileUseCase

describe('View pet adoption profile', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new ViewPetAdoptionProfileUseCase(petsRepository, orgsRepository)
  })

  it('should be able view pet adoption profile', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'joihndoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: '',
      number: '',
    })

    const pet = await petsRepository.create({
      org_id: org.id,
      age: '4',
      breed: 'labrador',
      feature: 'agitado',
      city: 'RJ',
    })

    const getPet = await sut.execute({ id: pet.id })
    console.log(getPet)
  })
})
