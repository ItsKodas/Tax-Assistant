import classNames from 'classnames';
import styles from './settings.module.scss';

export interface SettingsProps {
    className?: string;
}

export const Settings = ({ className }: SettingsProps) => {
    return <div className={classNames(styles.root)}>Settings</div>;
};
