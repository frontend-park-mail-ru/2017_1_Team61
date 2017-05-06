import React from 'react';
import styles from './Header.css';
import SignInIcon from 'react-icons/fa/sign-in';
import RegisterIcon from 'react-icons/fa/user-plus';

// todo Вынести кусок с логином в отдкльный компонент -> обернуть его в контейнер,
// todo который отображается либо как инфа о юзере либо как кнопка войти и зарегаться
export const Header = () => (
    <div className={styles.container}>
        <div className={styles.logo}>
            Logo
        </div>
        <div className={styles.item}>
            <div className={styles.icon}>
                <SignInIcon size={30}/>
            </div>
            <div className={styles.text}>
                Войти
            </div>
        </div>
        <div className={styles.item}>
            <div className={styles.icon}>
                <RegisterIcon size={30}/>
            </div>
            <div className={styles.text}>
                Регистрация
            </div>
        </div>
    </div>
);

export default Header;
