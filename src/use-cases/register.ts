import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface IRegisterUseCaseRequest {
  name: string
  address: string
  number: string
  email: string
  password: string
}

interface IRegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    address,
    number,
    name,
    password,
  }: IRegisterUseCaseRequest): Promise<IRegisterUseCaseResponse> {
    if (!address) {
      throw new Error('it is mandatory to fill in the field: Address')
    }

    if (!number) {
      throw new Error('it is mandatory to fill in the field: Address')
    }

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      address,
      email,
      number,
      password_hash,
    })

    return {
      org,
    }
  }
}
