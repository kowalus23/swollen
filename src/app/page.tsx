'use client'

import Footer from '@/components/Footer/Footer';
import Events from '@/components/Pages/home/Events';
import PreviewItems from '@/components/Pages/home/PreviewItems';
import SocialMedia from '@/components/Pages/home/SocialMedia';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Hero from '../components/Pages/home/Hero';
import Shop from '../components/Pages/home/Shop';

export default function Home() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) router.push('/logowanie')
      else setUser(data.user)
    })
  }, [])

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
