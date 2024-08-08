import { MobileHomeWrapper } from "./components/MobileHomeWrapper";

export const metadata = {
  title: 'PFC Mobile - Home',
  description: 'Discover exquisite fragrances from around the world on our mobile-friendly platform.',
};

export default function MobileHomePage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const initialSearchTerm = searchParams.q || '';
  
  return <MobileHomeWrapper initialSearchTerm={initialSearchTerm} />;
}