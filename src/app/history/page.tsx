
import { getHistoryEvents } from '@/actions/history';
import HistoryClient from '@/components/history/HistoryClient';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const events = await getHistoryEvents();

  return <HistoryClient events={events} />;
}
