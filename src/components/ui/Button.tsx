import styles from './Button.module.css';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline'| 'puretext';
  disabled?: boolean;
  className?: string;
};

function Button({ 
  children, 
  onClick, 
  type = 'submit', 
  variant = 'primary',
  disabled = false,
  className = ''
}: Props) {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`.trim();
  
  return (
    <button 
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
}

export default Button;