const UserProfile = () => {
  const user = localStorage.getItem('user');
  const avatar = localStorage.getItem(`avatar_${user}`) || '';

  return (
    <div className="flex items-center gap-3">
      {avatar && (
        <img
          src={avatar}
          alt={user}
          className="w-10 h-10 rounded-full border border-zinc-500 object-cover"
        />
      )}
      <span className="text-sm font-medium">{user}</span>
    </div>
  );
};

export default UserProfile;
