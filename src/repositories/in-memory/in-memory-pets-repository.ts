import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findPetsWithFilters(
    city: string,
    page: number,
    feature?: string,
    breed?: string,
    age?: string,
  ) {
    const filteredPets = this.items
      .filter(
        (item) =>
          item.city === city &&
          (!feature || item.feature.includes(feature)) &&
          (!breed || item.breed === breed) &&
          (!age || item.age === age),
      )
      .slice((page - 1) * 20, page * 20)

    return filteredPets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async setAsAdopted(id: string) {
    const petIndex = this.items.findIndex((item) => item.id === id)

    if (petIndex === -1) {
      return null
    }

    this.items[petIndex].adopted = true

    return this.items[petIndex]
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    // const pet = { ...data, id: randomUUID(), name: data.name ?? '' }

    const pet = {
      id: randomUUID(),
      name: data.name ?? '',
      breed: data.breed,
      age: data.age,
      city: data.city,
      feature: data.feature,
      org_id: data.org_id,
      adopted: false,
    }

    this.items.push(pet)

    return pet
  }
}
