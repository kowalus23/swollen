import Footer from '@/components/Footer/Footer';
import Events from '@/components/Pages/home/Events';
import PreviewItems from '@/components/Pages/home/PreviewItems';
import SocialMedia from '@/components/Pages/home/SocialMedia';
import Hero from '../components/Pages/home/Hero';
import Shop from '../components/Pages/home/Shop';

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Shop />
      <Events />
      <PreviewItems />
      <SocialMedia />
      <Footer />
    </div>
  );
}
