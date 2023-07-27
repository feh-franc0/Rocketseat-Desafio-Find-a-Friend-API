import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface ISearchPetByCityUseCaseRequest {
  city: string
}

interface ISearchPetByCityUseCaseResponse {
  pets: Pet[]
}

// export class SearchPetByCityUseCase {
export class SearchPetByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(city)

    return { pets }
  }
}
