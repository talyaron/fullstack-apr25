import { useState } from "react";
import style from "./Card.module.scss";

const AboutMe = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.card}>
            <div
                className={style.header}
                onClick={() => setOpen(!open)}
            >
                A LITTLE BIT ABOUT ME
            </div>

            <div className={`${style.contentWrapper} ${open ? style.open : ""}`}>
                <div className={style.content}>
                    <p>
                        I'm 21 years old and currently studying Full Stack Development.
                        I love exploring new technologies and building creative projects.
                        I’m passionate about personal growth and learning something new every day.
                        Outside of coding, I enjoy living life to the fullest and finding joy in the little things.

                    </p>
                </div>
            </div>
        </div>
    );
};
const Hobbies = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.card}>
            <div
                className={style.header}
                onClick={() => setOpen(!open)}
            >
                MY HOBBIES
            </div>

            <div className={`${style.contentWrapper} ${open ? style.open : ""}`}>
                <div className={style.content}>


                </div>
            </div>
        </div>
    );
};
const Skills = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.card}>
            <div
                className={style.header}
                onClick={() => setOpen(!open)}
            >
                MY SKILLS
            </div>

            <div className={`${style.contentWrapper} ${open ? style.open : ""}`}>
                <div className={style.content}>
                    <p>
                        I'm 21 years old and currently studying Full Stack Development.
                        I love exploring new technologies and building creative projects.
                        I’m passionate about personal growth and learning something new every day.
                        Outside of coding, I enjoy living life to the fullest and finding joy in the little things.

                    </p>
                </div>
            </div>
        </div>
    );
};
export { AboutMe };
export { Hobbies };
