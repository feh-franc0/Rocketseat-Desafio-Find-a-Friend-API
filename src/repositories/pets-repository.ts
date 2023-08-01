import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findByTraits(trait: string, page: number): Promise<Pet[]>
  findByCity(city: string, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetsWithFilters(
    city: string,
    page: number,
    feature?: string,
    breed?: string,
    age?: string,
  ): Promise<Pet[]>
}
