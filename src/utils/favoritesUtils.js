export const getUserKey = () => {
  try {
    const userRaw = localStorage.getItem("user");
    const user = JSON.parse(userRaw);
    return user?.email || "anonymous";
  } catch {
    return "anonymous";
  }
};

export const getFavorites = () => {
  const key = getUserKey();
  const data = JSON.parse(localStorage.getItem("favorites")) || {};
  return data[key]?.favorites || [];
};

export const toggleFavorite = (media) => {
  const key = getUserKey();
  const data = JSON.parse(localStorage.getItem("favorites")) || {};
  const favs = data[key]?.favorites || [];

  const exists = favs.some((f) => f.id === media.id && f.type === media.type);

  const updated = exists
    ? favs.filter((f) => !(f.id === media.id && f.type === media.type))
    : [...favs, media];

  localStorage.setItem(
    "favorites",
    JSON.stringify({
      ...data,
      [key]: { favorites: updated },
    })
  );

  return updated;
};

export const isFavorite = (media) => {
  const favs = getFavorites();
  return favs.some((f) => f.id === media.id && f.type === media.type);
};
