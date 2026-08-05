import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchRepos = () => {
    setLoading(true);
    setError(null);
    fetch('https://api.github.com/users/mahekshaikh07/repos')
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div>
        <ErrorMessage message={error} />
        <button onClick={fetchRepos}>Retry</button>
      </div>
    );
  }

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>My GitHub Repositories</h2>

      <input
        type="text"
        placeholder="Search repos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredRepos.map((repo) => (
        <div key={repo.id}>
          <p>{repo.name} ⭐ {repo.stargazers_count}</p>
          <a href={repo.html_url} target="_blank" rel="noreferrer">View Repo</a>
        </div>
      ))}
    </div>
  );
}

export default Projects;