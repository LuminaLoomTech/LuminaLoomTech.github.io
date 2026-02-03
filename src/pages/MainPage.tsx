import styles from './MainPage.module.css';
import HomeSection from './sections/home/HomeSection';
import AboutSection from './sections/about/AboutSection';
import ServicesSection from './sections/services/ServicesSection';
import ContactSection from './sections/contact/ContactSection';

export default function MainPage() {
  return (
    <div className={styles.mainPage}>
      <HomeSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
