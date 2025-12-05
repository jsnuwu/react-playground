/*export const fetchPlayersFromGitHub = async () => {
  const USER = process.env.REACT_APP_GITHUB_USER;
  const REPO = process.env.REACT_APP_GITHUB_REPO;
  const PATH = process.env.REACT_APP_PLAYERS_PATH;
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
  const res = await fetch("/api/updatePlayers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ players: updatedPlayers, sha }),
  });
  return res.json();
};
*/
