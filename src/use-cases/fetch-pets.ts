import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { NoPetsFoundError } from './errors/no-pets-found-error'

interface ISearchPetByCityUseCaseRequest {
  city: string
  name?: string
  breed?: string
  age?: string
  feature?: string
  page: number
}

interface ISearchPetByCityUseCaseResponse {
  pets: Pet[]
}

export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
    feature,
    breed,
    age,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.findPetsWithFilters(
      city,
      page,
      feature,
      breed,
      age,
    )

    return { pets }
  }
}
