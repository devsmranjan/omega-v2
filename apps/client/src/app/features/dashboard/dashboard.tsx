import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/slices/auth.slice';
import styles from './dashboard.module.scss';

export function Dashboard() {
    const user: any = useSelector(selectCurrentUser);

    return (
        <div className={styles['container']}>
            <h1>Welcome {user?.name}!</h1>
        </div>
    );
}

export default Dashboard;
