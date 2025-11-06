import type { JSX } from 'react'
import styles from './App.module.scss'
import BusinessCard from './components/BusinessCard/BusinessCard'


export default function App(): JSX.Element {
return (
<div className={styles.app}>
<div className="container">
<header className={styles.header}>
<h1 className={styles.title}>Hello — I'm Nachman</h1>
<p className={styles.lead}>A profile built with React, Vite and SCSS modules</p>
</header>

<main>
<BusinessCard />
</main>

<footer className={styles.footer}>
<small>Designed in soft pastel — fully componentized with SCSS modules.</small>
</footer>
</div>
</div>
)
}