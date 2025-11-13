import style from './Header.module.scss'
const Header = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // makes it scroll smoothly
        });
    };

    return (
        <div className={style.header}>
            <span className={style.headerLink} onClick={scrollToTop}>
                AYALA HALEVI - MY BLOG
            </span>
        </div>
    );
};

export default Header;
