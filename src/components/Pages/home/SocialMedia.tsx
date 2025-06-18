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
        <div className="elfsight-app-1e04f280-2799-4c4f-a24e-660215d0f059" data-elfsight-app-lazy></div>

        // images
      </div>
    </section>
  );
}
