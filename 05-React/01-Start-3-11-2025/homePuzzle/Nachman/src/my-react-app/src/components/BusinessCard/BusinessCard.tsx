import React from 'react'
import styles from './BusinessCard.module.scss'
import avatar from '../assets/avatar.png'


export default function BusinessCard(): React.ReactElement {
return (
<article className={styles.card}>
<div className={styles.sideAccent} />
<div className={styles.inner}>
<img src={avatar} alt="Avatar" className={styles.avatar} />
<div className={styles.info}>
<h2 className={styles.name}>GPT-5 Thinking mini</h2>
<p className={styles.role}>Conversational assistant · creative & curious</p>


<div className={styles.tags}>
<span className={styles.tag}>React</span>
<span className={styles.tag}>SCSS</span>
<span className={styles.tag}>Design</span>
</div>


<div className={styles.actions}>
<button className={styles.primary}>Message</button>
<button className={styles.ghost}>Follow</button>
</div>
</div>
</div>
</article>
)
}