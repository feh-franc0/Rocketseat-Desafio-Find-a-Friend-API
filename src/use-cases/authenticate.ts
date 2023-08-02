import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialErros } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

interface IAuthenticateUseCaseRequest {
  email: string
  password: string
}

interface IAuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialErros()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialErros()
    }

    return {
      org,
    }
  }
}
