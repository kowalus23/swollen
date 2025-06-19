import { FacebookEmbed, InstagramEmbed, LinkedInEmbed } from 'react-social-media-embed';
import styles from './SocialMedia.module.scss';

export default function SocialMedia() {
  return (
    <section className={styles.socialMediaSection}>
      <div className={styles.socialMediaGridBackground} />
      <div className={styles.socialMediaContent}>
        <h2 className={styles.title}>ODIWEDŹ NAS W SOCIALACH!</h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, nobis.
        </p>
        <div className={styles.socialMediaIcons}>
          // icons
        </div>

        <div className={styles.socialMediaSocials}>
          <div className={styles.socialMediaIconsRow}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LinkedInEmbed
                url="https://www.linkedin.com/embed/feed/update/urn:li:share:6898694772484112384"
                postUrl="https://www.linkedin.com/posts/peterdiamandis_5-discoveries-the-james-webb-telescope-will-activity-6898694773406875648-z-D7"
                width={325}
                height={570}
              />
            </div>
          </div>
          <div className={styles.socialMediaIconsRow}>
            <FacebookEmbed url="https://www.facebook.com/andrewismusic/posts/451971596293956" width={550} />
          </div>
        </div>
      </div>
    </section >
  );
}
