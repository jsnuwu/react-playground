export const fetchPlayersFromGitHub = async () => {
  const USER = process.env.REACT_APP_GITHUB_USER;
  const REPO = process.env.REACT_APP_GITHUB_REPO;
  const PATH = process.env.REACT_APP_PLAYERS_PATH;
  const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const BRANCH = "main";

  const headers = {
    Authorization: `token ${TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(
      `https://api.github.com/repos/${USER}/${REPO}/contents/${PATH}?ref=${BRANCH}`,
      { headers }
    );
    if (!res.ok) throw new Error("Fehler beim Laden der Spieler");
    const data = await res.json();
    const content = JSON.parse(atob(data.content));
    return { players: content, sha: data.sha };
  } catch (err) {
    console.error(err);
    return { players: [], sha: null };
  }
};

export const savePlayersToGitHub = async (updatedPlayers, sha) => {
  const USER = process.env.REACT_APP_GITHUB_USER;
  const REPO = process.env.REACT_APP_GITHUB_REPO;
  const PATH = process.env.REACT_APP_PLAYERS_PATH;
  const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const BRANCH = "main";

  const headers = {
    Authorization: `token ${TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
    const body = {
      message: "Update player stats",
      content: btoa(JSON.stringify(updatedPlayers, null, 2)),
      sha,
      branch: BRANCH,
    };
    const res = await fetch(
      `https://api.github.com/repos/${USER}/${REPO}/contents/${PATH}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) throw new Error("Fehler beim Speichern der Spieler");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
