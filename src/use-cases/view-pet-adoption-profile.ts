import { Org, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { NoPetsFoundError } from './errors/no-pets-found-error'
import { NoOrgsFoundError } from './errors/no-organization-found-error'

interface ISearchPetByCityUseCaseRequest {
  id: string
}

interface ISearchPetByCityUseCaseResponse {
  pet: Pet
  org: Org
  linkWhatsApp: string
}

export class ViewPetAdoptionProfileUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    id,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new NoPetsFoundError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new NoOrgsFoundError()
    }

    const sendMessage =
      'olá, gostaria de adotar um Cãopanheiro, como posso prosseguir com a adoção?'
    const numberOfOrg = org.number
    const linkWhatsApp = `https://api.whatsapp.com/send/?phone=${numberOfOrg}&text=${sendMessage}&type=phone_number&app_absent=0`

    return { pet, org, linkWhatsApp }
  }
}
