import { Hero } from '@/components/sections/Hero';
import { Highlights } from '@/components/sections/Highlights';
import { RecentGallery } from '@/components/sections/RecentGallery';
import { RecruitmentBanner } from '@/components/sections/RecruitmentBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <RecentGallery />
      <RecruitmentBanner />
    </>
  );
}
