import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetByCityUseCase } from './search-pet-by-city'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetByCityUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetByCityUseCase(petsRepository)
  })

  it('should be able to register', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'joihndoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: '',
      number: '',
    })

    await petsRepository.create({
      org_id: org.id,
      age: '3',
      breed: 'golden',
      feature: 'carinhoso',
      city: 'RJ',
    })

    await petsRepository.create({
      org_id: org.id,
      age: '4',
      breed: 'labrador',
      feature: 'agitado',
      city: 'RJ',
    })

    const searchPetByCity = await sut.execute({ city: 'RJ' })

    expect(searchPetByCity.pets[0].city).toEqual('RJ')

    expect(searchPetByCity).toEqual({
      pets: [
        expect.objectContaining({ city: 'RJ' }),
        expect.objectContaining({ city: 'RJ' }),
      ],
    })
  })
})