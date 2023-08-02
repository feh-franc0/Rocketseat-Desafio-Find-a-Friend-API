import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetsWithFilters(
    city: string,
    page: number,
    feature?: string,
    breed?: string,
    age?: string,
  ): Promise<Pet[]>
}
