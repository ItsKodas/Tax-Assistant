import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {

    const Logout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
    }

    return (
        <div className="flex justify-center gap-5 fixed top-0 left-0 m-3">
            <Link to="/">Home</Link>
            <Link to="/folders">Folders</Link>
            <Link to="/settings">Settings</Link>

            <div className={styles.button} onClick={Logout}>Logout</div>
        </div>
    );
};
