import Image from 'next/image';
import { FacebookEmbed, InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';
import styles from './SocialMedia.module.scss';

export default function SocialMedia() {
  return (
    <section className={styles.socialMediaSection}>
      <div className={styles.socialMediaGridBackground} />
      <div className={styles.socialMediaContent}>
        <div className={styles.socialMediaTitle}>
          <Image className={styles.titleImage} src="/images/socials-title-image.png" alt="title" width={562} height={52} />
        </div>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, nobis.
        </p>
        <div className={styles.socialMediaIcons}>
          <div className={styles.socialMediaIcon}>
            <Image src="/images/facebook-icon.svg" alt="icon" width={32} height={32} />
          </div>
          <div className={styles.socialMediaIcon}>
            <Image src="/images/instagram-icon.svg" alt="icon" width={32} height={32} />
          </div>
          <div className={styles.socialMediaIcon}>
            <Image src="/images/tiktok-icon.svg" alt="icon" width={32} height={32} />
          </div>
        </div>

        <div className={styles.socialMediaSocials}>
          <div className={styles.socialMediaIconsRow}>
            <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
            <TikTokEmbed url="https://www.tiktok.com/@epicgardening/video/7055411162212633903" width={325} />
            <FacebookEmbed url="https://www.facebook.com/andrewismusic/posts/451971596293956" width={325} />
          </div>
        </div>
      </div>
    </section >
  );
}
