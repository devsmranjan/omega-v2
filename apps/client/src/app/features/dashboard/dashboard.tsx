import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/auth.slice';
import styles from './dashboard.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
    const user: any = useSelector(selectCurrentUser);

    return (
        <div className={styles['container']}>
            <h1>Welcome {user?.name}!</h1>
        </div>
    );
}

export default Dashboard;
