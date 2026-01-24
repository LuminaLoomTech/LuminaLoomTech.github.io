import styles from './Input.module.css';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
};

function TextInput({ value, onChange, placeholder = "請輸入電子郵件", disabled = false }: Props) {
    return (
        <input
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
        />
    );
}
export default TextInput;