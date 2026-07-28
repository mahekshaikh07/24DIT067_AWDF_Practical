import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const fetchRepos = () => {
  setLoading(true);
  setError(null);
  fetch('https://api.github.com/users/mahekshaikh07/repos')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to load repos (status ' + res.status + ')');
      return res.json();
    })
    .then((data) => setRepos(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
};

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) return <Spinner />;
  if (error) return (
    <div>
      <ErrorMessage message={error} />
      <button onClick={fetchRepos}>Retry</button>
    </div>
  );

  return (
    <section className="projects">
      <h2>My GitHub Projects</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            {' '}⭐ {repo.stargazers_count}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects;