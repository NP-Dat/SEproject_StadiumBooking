import React from 'react';
import AppRouter from './routes/Route';
import styles from './App.module.css';

const App = () => (
  <div className={styles.app}>
    <AppRouter />
  </div>
);

export default App;
