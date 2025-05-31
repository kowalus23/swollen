import Hero from '../components/Pages/home/Hero';
import Shop from '../components/Pages/home/Shop';

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Hero />
      <Shop />
    </div>
  );
}
