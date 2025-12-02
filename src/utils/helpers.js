export const fetchJson = async (path) => {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Failed to load data');
  return response.json();
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
};
