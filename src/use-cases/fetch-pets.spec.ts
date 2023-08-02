import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetByCityUseCase } from './fetch-pets'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetByCityUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetByCityUseCase(petsRepository)
  })

  it('should be able to find the pets of a city', async () => {
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

    const searchPetByCity = await sut.execute({ city: 'RJ', page: 1 })

    expect(searchPetByCity.pets[0].city).toEqual('RJ')

    expect(searchPetByCity).toEqual({
      pets: [
        expect.objectContaining({ city: 'RJ' }),
        expect.objectContaining({ city: 'RJ' }),
      ],
    })
  })

  it('should be able to find the pets of a city and traits', async () => {
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

    await petsRepository.create({
      org_id: org.id,
      age: '2',
      breed: 'labrador',
      feature: 'quieto',
      city: 'RJ',
    })

    const searchPetByCity = await sut.execute({
      city: 'RJ',
      page: 1,
      breed: 'labrador',
    })

    expect(searchPetByCity.pets[0].city).toEqual('RJ')

    expect(searchPetByCity).toEqual({
      pets: [
        expect.objectContaining({ age: '4', breed: 'labrador', city: 'RJ' }),
        expect.objectContaining({ age: '2', breed: 'labrador', city: 'RJ' }),
      ],
    })
  })

  it('should be able to find the pets in a paginated way', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'joihndoe@gmail.com',
      password_hash: await hash('123456', 6),
      address: '',
      number: '',
    })

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        org_id: org.id,
        age: `${i}`,
        breed: 'golden',
        feature: 'carinhoso',
        city: 'RJ',
      })
    }

    const searchPetByCity = await sut.execute({ city: 'RJ', page: 2 })

    expect(searchPetByCity.pets).toHaveLength(2)
    expect(searchPetByCity).toEqual({
      pets: [
        expect.objectContaining({ age: '21' }),
        expect.objectContaining({ age: '22' }),
      ],
    })
  })
})
