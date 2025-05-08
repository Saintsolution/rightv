import { useState, FormEvent } from 'react';
import { supabase } from '../supabaseClient';

export function Admin() {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/;
    if (!youtubeRegex.test(videoUrl)) {
      setMessage('Insira um link válido do YouTube.');
      return;
    }

    const { error } = await supabase.from('daily_videos').insert([
      {
        title,
        video_url: videoUrl,
      },
    ]);

    if (error) {
      setMessage('Erro ao salvar vídeo: ' + error.message);
    } else {
      setMessage('Vídeo salvo com sucesso!');
      setTitle('');
      setVideoUrl('');
      setTimeout(() => {
        window.location.hash = '#player';
      }, 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Inserir Vídeo do Dia</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <div>
          <label className="block mb-1 font-medium">Título do Vídeo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Link do Vídeo (YouTube)
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Salvar Vídeo
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}
