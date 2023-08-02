import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { NoOrgsFoundError } from './errors/no-organization-found-error'

interface GetOrgProfileUseCaseRequest {
  orgId: string
}

interface GetOrgProfileUseCaseResponse {
  org: Org
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new NoOrgsFoundError()
    }

    return {
      org,
    }
  }
}
