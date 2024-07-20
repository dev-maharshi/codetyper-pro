import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <section className="welcome">
        <h1>Welcome to CodeTyper Pro</h1>
        <p>Improve your typing skills with a variety of tests and track your progress over time.</p>
        <Link className="btn" to="/test">Start Typing Test</Link>
      </section>
      <section className="recent-progress">
        <h2>Recent Progress</h2>
        <div id="progress-chart"></div>
      </section>
    </main>
  );
}

export default Home;
