import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface IFetchPetsUseCaseRequest {
  city: string
  page: number
  name?: string
  breed?: string
  age?: string
  feature?: string
}

interface IFetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
    feature,
    breed,
    age,
  }: IFetchPetsUseCaseRequest): Promise<IFetchPetsUseCaseResponse> {
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
