import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface IRegisterUseCaseRequest {
  name: string
  address: string
  number: string
  email: string
  password: string
}

export async function registerUseCase({
  email,
  address,
  number,
  name,
  password,
}: IRegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  await prisma.org.create({
    data: {
      address,
      email,
      name,
      number,
      password_hash,
    },
  })
}
