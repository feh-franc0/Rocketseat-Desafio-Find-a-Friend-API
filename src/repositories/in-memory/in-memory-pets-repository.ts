import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
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
    }

    this.items.push(pet)

    return pet
  }
}
