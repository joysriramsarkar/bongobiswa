'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLiteratureWorks() {
  try {
    const works = await prisma.literatureWork.findMany({
      orderBy: {
        publishedYear: 'asc',
      },
    });
    return works;
  } catch (error) {
    console.error('Error fetching literature works:', error);
    return [];
  }
}

export async function getLiteratureWorksByCategory(category: string) {
  try {
    const works = await prisma.literatureWork.findMany({
      where: {
        type: category,
      },
      orderBy: {
        publishedYear: 'asc',
      },
    });
    return works;
  } catch (error) {
    console.error('Error fetching literature works by category:', error);
    return [];
  }
}
