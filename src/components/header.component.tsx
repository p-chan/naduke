import * as React from 'react'

import styles from './header.css'

export const HeaderComponent: React.FC = () => {
  return (
    <header>
      <h1 className={styles.title}>naduke</h1>
    </header>
  )
}
