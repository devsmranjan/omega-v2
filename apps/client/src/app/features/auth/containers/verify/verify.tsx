import styles from './verify.module.scss';

/* eslint-disable-next-line */
export interface VerifyProps {}

export function Verify(props: VerifyProps) {
    return (
        <div className={styles['container']}>
            <h1>Welcome to Verify!</h1>
        </div>
    );
}

export default Verify;
