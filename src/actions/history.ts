'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getHistoryEvents() {
  console.log('getHistoryEvents called');
  try {
    const events = await prisma.historyEvent.findMany({
      orderBy: {
        year: 'asc',
      },
    });
    console.log('getHistoryEvents found:', events.length, 'events');
    return events;
  } catch (error) {
    console.error('Error fetching history events:', error);
    return [];
  }
}
