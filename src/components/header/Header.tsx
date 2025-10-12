import logo from '../../assets/images/logo1.png';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src={logo} className={styles['logo-img']} alt="公司Logo" />
                <span className={styles['company-name']}>希織工作室</span>
            </Link>
        </header>
    )
}
export default Header;