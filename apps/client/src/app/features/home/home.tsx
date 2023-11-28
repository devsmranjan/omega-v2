import { Link } from 'react-router-dom';
import styles from './home.module.scss';

export function Home() {
    return (
        <div className={styles['container']}>
            <h1>Welcome to Home!</h1>

            <Link to="/auth/login">Login</Link>
        </div>
    );
}

export default Home;
