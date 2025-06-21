import { useSocials } from '@/hooks/useSocials';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FacebookEmbed, InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';
import { HomeSection, useHomeSectionStore } from '../../../store/homeSectionStore';
import styles from './SocialMedia.module.scss';

export default function SocialMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setCurrentSection } = useHomeSectionStore();
  const { data: socials, isLoading, error } = useSocials();
  const [visibleEmbeds, setVisibleEmbeds] = useState({
    instagram: false,
    tiktok: false,
    facebook: false
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(HomeSection.SOCIAL_MEDIA);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [setCurrentSection]);

  useEffect(() => {
    if (socials) {
      // Show Instagram immediately
      if (socials.instagramUrl) {
        setVisibleEmbeds(prev => ({ ...prev, instagram: true }));
      }

      // Show TikTok after 250ms
      if (socials.tiktokUrl) {
        setTimeout(() => {
          setVisibleEmbeds(prev => ({ ...prev, tiktok: true }));
        }, 250);
      }

      // Show Facebook after 500ms
      if (socials.facebookUrl) {
        setTimeout(() => {
          setVisibleEmbeds(prev => ({ ...prev, facebook: true }));
        }, 500);
      }
    }
  }, [socials]);

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <section ref={sectionRef} className={styles.socialMediaSection}>
        <div className={styles.socialMediaGridBackground} />
        <div className={styles.socialMediaContent}>
          <p>Loading social media...</p>
        </div>
      </section>
    );
  }

  if (error || !socials) {
    return (
      <section ref={sectionRef} className={styles.socialMediaSection}>
        <div className={styles.socialMediaGridBackground} />
        <div className={styles.socialMediaContent}>
          <p>Error loading social media</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={styles.socialMediaSection}>
      <div className={styles.socialMediaGridBackground} />
      <div className={styles.socialMediaContent}>
        <Image className={styles.socialMediaContentBackgroundImage} src="/images/background-feed-image.png" alt="background" width={1700} height={995} />
        <div className={styles.socialMediaTitle}>
          <Image className={styles.titleImage} src="/images/socials-title-image.png" alt="title" width={562} height={52} />
        </div>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, nobis.
        </p>
        <div className={styles.socialMediaIcons}>
          {socials.facebookUrl && (
            <div
              className={styles.socialMediaIcon}
              onClick={() => handleSocialClick(socials.facebookUrl)}
              style={{ cursor: 'pointer' }}
            >
              <Image src="/images/facebook-icon.svg" alt="icon" width={32} height={32} />
            </div>
          )}
          {socials.instagramUrl && (
            <div
              className={styles.socialMediaIcon}
              onClick={() => handleSocialClick(socials.instagramUrl)}
              style={{ cursor: 'pointer' }}
            >
              <Image src="/images/instagram-icon.svg" alt="icon" width={32} height={32} />
            </div>
          )}
          {socials.tiktokUrl && (
            <div
              className={styles.socialMediaIcon}
              onClick={() => handleSocialClick(socials.tiktokUrl)}
              style={{ cursor: 'pointer' }}
            >
              <Image src="/images/tiktok-icon.svg" alt="icon" width={32} height={32} />
            </div>
          )}
        </div>

        <div className={styles.socialMediaSocials}>
          <div className={styles.socialMediaIconsRow}>
            {socials.instagramUrl && visibleEmbeds.instagram && (
              <InstagramEmbed url={socials.instagramUrl} width={328} />
            )}
            {socials.tiktokUrl && visibleEmbeds.tiktok && (
              <TikTokEmbed url={socials.tiktokUrl} width={325} />
            )}
            {socials.facebookUrl && visibleEmbeds.facebook && (
              <FacebookEmbed url={socials.facebookUrl} width={325} />
            )}
          </div>
        </div>

        <div className={styles.footerImages}>
          <Image className={styles.makeYourMoveImage} src="/images/make-your-move-image.png" alt="footer-image-1" width={320} height={340} />
          <Image className={styles.bigCatImage} src="/images/big-cat-image.png" alt="footer-image-1" width={600} height={400} />
          <Image className={styles.noRulesImage} src="/images/no-rules-image.png" alt="footer-image-2" width={382} height={266} />
        </div>
      </div>
    </section>
  );
}
