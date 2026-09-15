'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteTransaction(id) {
  const session = await auth();
  if (!session) redirect('/login');

  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction || transaction.userId !== session.user.id) {
    throw new Error('Not authorized');
  }

  await prisma.transaction.delete({ where: { id } });
  revalidatePath('/dashboard');
}

export async function updateTransaction(id, formData) {
  const session = await auth();
  if (!session) redirect('/login');

  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction || transaction.userId !== session.user.id) {
    throw new Error('Not authorized');
  }

  await prisma.transaction.update({
    where: { id },
    data: {
      title: formData.get('title'),
      amount: parseFloat(formData.get('amount')),
      type: formData.get('type'),
      category: formData.get('category'),
      date: new Date(formData.get('date')),
      notes: formData.get('notes') || null,
    },
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}