import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { NoOrgsFoundError } from './errors/no-organization-found-error'

interface IGetOrgProfileUseCaseRequest {
  orgId: string
}

interface IGetOrgProfileUseCaseResponse {
  org: Org
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: IGetOrgProfileUseCaseRequest): Promise<IGetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new NoOrgsFoundError()
    }

    return {
      org,
    }
  }
}
