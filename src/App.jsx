import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [orgRepos, setOrgRepos] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);

  const business = {
    name: "Jens Collaert IT Services",
    address: "Statiestraat 26, 1570 Pajottegem, België",
    kbo: "1025.363.838", 
    phone: "+32 472 45 25 11",
    email: "jens.collaert@hotmail.com"
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('https://api.github.com/users/Jens-Co/repos?sort=pushed&direction=desc&per_page=12');
      const data = await response.json();
      const projectsWithCommits = await Promise.all(
        data.filter(repo => !repo.fork).map(async repo => {
          try {
            const commitsRes = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`);
            const commits = await commitsRes.json();
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description provided',
              url: repo.html_url,
              language: repo.language,
              lastCommit: commits[0]?.commit?.message,
              lastCommitDate: commits[0]?.commit?.committer?.date,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
            };
          } catch {
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description || 'No description provided',
              url: repo.html_url,
              language: repo.language,
              lastCommit: null,
              lastCommitDate: null,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
            };
          }
        })
      );
      setProjects(projectsWithCommits);
    };

    const fetchOrgs = async () => {
      const response = await fetch('https://api.github.com/users/Jens-Co/orgs?per_page=100');
      const data = await response.json();
      setOrgs(
        data.map(org => ({
          id: org.id,
          login: org.login,
          description: org.description || '',
          url: org.html_url,
          avatar: org.avatar_url,
        }))
      );
      return data.map(org => org.login);
    };

    const fetchOrgRepos = async (orgLogins) => {
      let allRepos = [];
      for (const org of orgLogins) {
        const res = await fetch(`https://api.github.com/orgs/${org}/repos?sort=pushed&direction=desc&per_page=6`);
        const data = await res.json();
        allRepos = allRepos.concat(
          data.map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description provided',
            url: repo.html_url,
            language: repo.language,
            org: org,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            lastCommitDate: repo.pushed_at,
          }))
        );
      }
      setOrgRepos(allRepos);
    };

    const fetchProfile = async () => {
      const response = await fetch('https://api.github.com/users/Jens-Co');
      const data = await response.json();
      setAvatar(data.avatar_url);
      setBio(data.bio || 'Minecraft/Java/Python developer');
    };

    (async () => {
      await fetchProjects();
      const orgLogins = await fetchOrgs();
      await fetchOrgRepos(orgLogins);
      await fetchProfile();
      setLoading(false);
    })();
  }, []);

  const skills = [
    { name: 'Java', icon: '☕' },
    { name: 'Python', icon: '🐍' },
    { name: 'Minecraft Plugins', icon: '🟩' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'React', icon: '⚛️' },
    { name: 'Linux', icon: '🐧' },
    { name: 'Docker', icon: '🐳' },
  ];

  const socials = [
    { name: 'GitHub', url: 'https://github.com/Jens-Co', icon: 'fab fa-github' },
    { name: 'LinkedIn', url: 'https://be.linkedin.com/in/jens-collaert-a02525137', icon: 'fab fa-linkedin' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <nav className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            {avatar && (
              <img src={avatar} alt="Jens Collaert" className="w-9 h-9 rounded-full border border-gray-300" />
            )}
            <h1 className="text-xl font-bold text-gray-900">Jens Collaert</h1>
          </div>
          <div className="space-x-6 hidden sm:block">
            <a href="#home" className="text-gray-600 hover:text-blue-700 transition">Home</a>
            <a href="#skills" className="text-gray-600 hover:text-blue-700 transition">Skills</a>
            <a href="#projects" className="text-gray-600 hover:text-blue-700 transition">Projects</a>
            <a href="#orgs" className="text-gray-600 hover:text-blue-700 transition">Organizations</a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section id="home" className="py-12 bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            {avatar && (
              <img src={avatar} alt="Jens Collaert" className="mx-auto w-28 h-28 rounded-full border-2 border-blue-200 mb-6 shadow-sm" />
            )}
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-gray-900">Jens Collaert</h2>
            <p className="text-lg mb-4 text-gray-700">{bio}</p>
            <div className="flex justify-center gap-4 mb-4">
              {socials.map(s => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-500 hover:text-blue-600 transition"
                  title={s.name}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
            <a href="#projects" className="inline-block bg-blue-50 text-blue-700 px-7 py-2 rounded font-semibold shadow hover:bg-blue-100 transition mt-2">Bekijk projecten</a>
          </div>
        </section>

        <section id="business" className="py-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bedrijfsgegevens</h3>
            <div className="text-gray-700 mb-1">{business.name}</div>
            <div className="text-gray-700 mb-1">Adres: {business.address}</div>
            <div className="text-gray-700 mb-1">KBO: {business.kbo}</div>
            <div className="text-gray-700 mb-1">Tel: <a href={`tel:${business.phone}`} className="text-blue-700 hover:underline">{business.phone}</a></div>
            <div className="text-gray-700 mb-1">E-mail: <a href={`mailto:${business.email}`} className="text-blue-700 hover:underline">{business.email}</a></div>
          </div>
        </section>

        <section id="skills" className="py-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-7 text-center">Skills & Tech Stack</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {skills.map(skill => (
                <span key={skill.name} className="bg-white border border-gray-200 text-blue-700 px-5 py-2 rounded text-base font-medium flex items-center gap-2 shadow hover:bg-blue-50 transition">
                  <span>{skill.icon}</span> {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-14 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-7 text-center">My Latest Projects</h2>
            {loading ? (
              <div className="text-center text-gray-500">Loading projects...</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4" style={{ minWidth: '600px' }}>
                  {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-w-[300px] flex flex-col justify-between hover:shadow-md transition">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-700">{project.name}</h3>
                        <p className="text-gray-600 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
                          {project.language && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{project.language}</span>}
                          <span title="Stars">⭐ {project.stars}</span>
                          <span title="Forks">🍴 {project.forks}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        {project.lastCommit && (
                          <span>
                            Last commit: <span className="text-gray-600">{project.lastCommit.slice(0, 40)}{project.lastCommit.length > 40 ? '...' : ''}</span><br />
                            <span className="text-gray-500">{project.lastCommitDate && new Date(project.lastCommitDate).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 hover:text-blue-800 font-medium block text-right">View on GitHub →</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="org-projects" className="py-14 bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-7 text-center">Latest Organization Projects</h2>
            {loading ? (
              <div className="text-center text-gray-500">Loading organization repos...</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4" style={{ minWidth: '600px' }}>
                  {orgRepos.map(repo => (
                    <div key={repo.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 min-w-[300px] flex flex-col justify-between hover:shadow-md transition">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-700">{repo.name}</h3>
                        <p className="text-gray-600 mb-3">{repo.description}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{repo.org}</span>
                          {repo.language && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">{repo.language}</span>}
                          <span title="Stars">⭐ {repo.stars}</span>
                          <span title="Forks">🍴 {repo.forks}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        {repo.lastCommitDate && (
                          <span>
                            Last update: <span className="text-gray-600">{new Date(repo.lastCommitDate).toLocaleDateString()}</span>
                          </span>
                        )}
                      </div>
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-600 hover:text-blue-800 font-medium block text-right">View on GitHub →</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="orgs" className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-7 text-center">Organizations</h2>
            {loading ? (
              <div className="text-center text-gray-500">Loading organizations...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orgs.map(org => (
                  <div key={org.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex gap-6 items-center hover:shadow-md transition">
                    <img src={org.avatar} alt={org.login} className="w-12 h-12 rounded-full border border-blue-100" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-blue-700">{org.login}</h3>
                      {org.description && <p className="text-gray-600 mb-2">{org.description}</p>}
                      <a href={org.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Visit Organization →</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-2">
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="mx-2 text-xl text-white hover:text-blue-400 transition">
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
          <div className="mb-2 text-gray-300 text-sm">
            {business.name} | {business.address} | KBO: {business.kbo} | Tel: <a href={`tel:${business.phone}`} className="text-blue-300">{business.phone}</a> | E-mail: <a href={`mailto:${business.email}`} className="text-blue-300">{business.email}</a>
          </div>
          <p>© 2025 Jens Collaert. All rights reserved.</p>
        </div>
      </footer>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
}

export default App;