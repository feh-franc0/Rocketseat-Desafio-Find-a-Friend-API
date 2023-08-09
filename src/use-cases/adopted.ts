import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { NoPetsFoundError } from './errors/no-pets-found-error'

interface IAdoptedUseCaseRequest {
  id: string
}

interface IAdoptedUseCaseResponse {
  pet: Pet
}

export class AdoptedUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: IAdoptedUseCaseRequest): Promise<IAdoptedUseCaseResponse> {
    const petAdopted = await this.petsRepository.setAsAdopted(id)

    if (!petAdopted) {
      throw new NoPetsFoundError()
    }

    return { pet: petAdopted }
  }
}
