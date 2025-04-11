import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // 👈 hook para navegação

  const defaultAvatar =
    "https://www.gravatar.com/avatar/placeholder?d=mp&s=200";

  const handleLogin = () => {
    if (!username.trim()) {
      setErrorMessage("Nome de usuário é obrigatório!");
      return;
    }

    const avatarUrl = avatar.trim() || defaultAvatar;

    localStorage.setItem("user", JSON.stringify({ name: username, email: `${username}@example.com`, avatar: avatarUrl }));

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
      navigate("/home"); // 👈 redireciona para a página home
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 text-white p-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-lg p-8 max-w-sm w-full text-center border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-white">Bem-vindo de volta!</h2>

        {errorMessage && (
          <div className="text-red-500 mb-4 text-sm animate-pulse">
            {errorMessage}
          </div>
        )}

        {/* Avatar Preview */}
        <div className="flex justify-center mb-4">
          <img
            src={avatar || defaultAvatar}
            alt="Preview do Avatar"
            className="w-20 h-20 rounded-full border border-gray-500 object-cover"
          />
        </div>

        <div className="text-left">
          <label htmlFor="username" className="block mb-1 text-sm font-semibold">
            Nome de usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full px-4 py-2 mb-4 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <label htmlFor="avatar" className="block mb-1 text-sm font-semibold">
            URL do avatar (opcional)
          </label>
          <input
            type="url"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://..."
            className="w-full px-4 py-2 mb-6 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full py-3 rounded-md bg-red-600 font-semibold transition-all duration-300 ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-red-700"
            }`}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
