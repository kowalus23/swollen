import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="w-full">
        <div className="max-w-[1920px] mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">Welcome to Swollen</h1>
          <p className="mt-4 text-gray-600">Your new application is ready!</p>
        </div>
      </section>
    </main>
  );
}
