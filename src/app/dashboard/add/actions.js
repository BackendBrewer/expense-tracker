'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addTransaction(formData) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const title = formData.get('title');
  const amount = formData.get('amount');
  const type = formData.get('type');
  const category = formData.get('category');
  const date = formData.get('date');
  const notes = formData.get('notes');

  if (!title || !amount || !type || !category || !date) {
    throw new Error('All required fields must be filled');
  }

  await prisma.transaction.create({
    data: {
      userId: session.user.id,
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date(date),
      notes: notes || null,
    },
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}