import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface ISearchPetByCityUseCaseRequest {
  city: string
  page: number
}

interface ISearchPetByCityUseCaseResponse {
  pets: Pet[]
}

// export class SearchPetByCityUseCase {
export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    if (!city) {
      throw new Error('inform the city')
    }

    const pets = await this.petsRepository.findByCity(city, page)

    return { pets }
  }
}
