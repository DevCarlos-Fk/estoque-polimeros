// app/actions.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// Função para buscar todos os polímeros no estoque
export async function getEstoque() {
  return await prisma.polimero.findMany({
    orderBy: { diaChegada: 'desc' }
  })
}

// Função para cadastrar um novo lote de polímero
export async function cadastrarPolimero(formData: FormData) {
  const nome = formData.get('nome')?.toString() ?? ''
  const lote = formData.get('lote')?.toString() ?? ''
  const ruaArmazenada = formData.get('ruaArmazenada')?.toString() ?? ''
  const statusLiberacao = formData.get('statusLiberacao')?.toString() ?? ''
  const diaChegadaInput = formData.get('diaChegada')?.toString() ?? ''

  await prisma.polimero.create({
    data: {
      nome,
      lote,
      ruaArmazenada,
      statusLiberacao,
      diaChegada: diaChegadaInput ? new Date(diaChegadaInput) : new Date(),
    },
  })

  // Atualiza a página com os novos dados instantaneamente
  revalidatePath('/')
}