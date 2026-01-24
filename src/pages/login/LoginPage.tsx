import LoginForm from './LoginForm';
import styles from './Login.module.css';
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation();
  
  return (
    <div className={styles.page}>
      <div className={styles.formContainer}>
        <h2>{t('login.title')}</h2>
        <LoginForm />
      </div>
    </div>
  );
}
export default LoginPage;