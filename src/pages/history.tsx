import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

interface Video {
  id: number;
  title: string;
  video_url: string;
  created_at: string;
}

export function History() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('daily_videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar vídeos:', error.message);
      } else {
        setVideos(data);
      }
      setLoading(false);
    };

    fetchVideos();
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja apagar este vídeo?'
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from('daily_videos').delete().eq('id', id);

    if (error) {
      console.error('Erro ao deletar vídeo:', error.message);
    } else {
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Histórico de Vídeos
      </h1>
      {loading ? (
        <p className="text-center text-gray-500">Carregando vídeos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white p-4 rounded shadow relative"
            >
              <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
              <iframe
                src={getYouTubeEmbedUrl(video.video_url)}
                className="w-full h-56 rounded"
                allowFullScreen
              />
              <p className="text-sm text-gray-500 mt-2">
                Publicado em {new Date(video.created_at).toLocaleDateString()}
              </p>
              {user?.email === 'fccmauro@gmail.com' && (
                <button
                  onClick={() => handleDelete(video.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
                  title="Apagar vídeo"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
