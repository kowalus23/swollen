'use client'

import Footer from '@/components/Footer/Footer';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import Events from '@/components/Pages/home/Events';
import PreviewItems from '@/components/Pages/home/PreviewItems';
import SocialMedia from '@/components/Pages/home/SocialMedia';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import Hero from '../components/Pages/home/Hero';
import Shop from '../components/Pages/home/Shop';

export default function Home() {
  const setUser = useUserStore((state) => state.setUser);
  const isLoading = useUserStore((state) => state.isLoading);
  const setLoading = useUserStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) null
      else setUser(data.user)
    }).finally(() => {
      setLoading(false);
    });
  }, [])

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
