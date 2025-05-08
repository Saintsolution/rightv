// src/pages/player.tsx
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Video {
  id: number;
  title: string;
  video_url: string;
  created_at: string;
}

export function Player() {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchVideoOfTheDay = async () => {
      try {
        setLoading(true);
        setError('');

        const { data, error } = await supabase
          .from('daily_videos')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setVideo(data);
      } catch (err: any) {
        setError('Erro ao buscar o vídeo do dia.');
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoOfTheDay();
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (!match) return '';

    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&loop=1&playlist=${videoId}`;
  };

  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      if (iframe.requestFullscreen) iframe.requestFullscreen();
      else if ((iframe as any).webkitRequestFullscreen)
        (iframe as any).webkitRequestFullscreen();
      else if ((iframe as any).mozRequestFullScreen)
        (iframe as any).mozRequestFullScreen();
      else if ((iframe as any).msRequestFullscreen)
        (iframe as any).msRequestFullscreen();
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Carregando vídeo...</div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!video) {
    return (
      <div className="text-center mt-10 text-red-500">
        Nenhum vídeo disponível.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">{video.title}</h1>

      <div className="relative w-full max-w-5xl aspect-video rounded-xl shadow-2xl overflow-hidden">
        <iframe
          ref={iframeRef}
          src={getYouTubeEmbedUrl(video.video_url)}
          title="Vídeo do Dia"
          allowFullScreen
          className="w-full h-full"
        />
        <button
          onClick={handleFullscreen}
          className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm hover:bg-opacity-80"
        >
          Tela cheia
        </button>
      </div>
    </div>
  );
}
