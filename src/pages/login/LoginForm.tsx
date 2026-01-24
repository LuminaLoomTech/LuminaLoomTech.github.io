import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextInput from '../../components/form/TextInput';
import PasswordInput from '../../components/form/PasswordInput';
import Button from '../../components/ui/Button';
import styles from './Login.module.css';

function LoginForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.loginForm}>
      <TextInput 
        value={email} 
        onChange={setEmail}
        placeholder={t('login.emailPlaceholder')}
      />
      <PasswordInput 
        value={password} 
        onChange={setPassword}
        placeholder={t('login.passwordPlaceholder')}
      />
      <Button>{t('login.submit')}</Button>
    </form>
  );
}
export default LoginForm;