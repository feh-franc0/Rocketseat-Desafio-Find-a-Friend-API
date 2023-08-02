import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ViewPetAdoptionProfileUseCase } from './view-pet-adoption-profile'
import { NoPetsFoundError } from './errors/no-pets-found-error'
import { NoOrgsFoundError } from './errors/no-organization-found-error'

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

    const getPetAdoptionProfile = await sut.execute({ id: pet.id })

    expect(getPetAdoptionProfile).toEqual(
      expect.objectContaining({
        pet: expect.any(Object),
        org: expect.any(Object),
        linkWhatsApp: expect.stringContaining('https://api.whatsapp.com'),
      }),
    )
  })

  it('should not be able to search for a pet adoption profile by id', async () => {
    await expect(() => sut.execute({ id: 'x' })).rejects.toBeInstanceOf(
      NoPetsFoundError,
    )
  })

  it('should be able view pet adoption profile', async () => {
    const pet = await petsRepository.create({
      org_id: 'not-id',
      age: '4',
      breed: 'labrador',
      feature: 'agitado',
      city: 'RJ',
    })

    await expect(() => sut.execute({ id: pet.id })).rejects.toBeInstanceOf(
      NoOrgsFoundError,
    )
  })
})
