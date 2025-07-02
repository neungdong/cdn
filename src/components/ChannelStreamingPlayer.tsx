import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import useSocket from '../hooks/socket/useSocket';
import { SOCKET_PATHS } from '../hooks/socket/socketPaths';

interface ChannelStreamingPlayerProps {
  channelId: string;
  m3u8Url: string;
}

const ChannelStreamingPlayer: React.FC<ChannelStreamingPlayerProps> = ({ channelId, m3u8Url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 루프 방지
  const isRemoteChangeRef = useRef(false);

  const handleSyncEvent = (data: { type: 'PLAY' | 'PAUSE' | 'SEEK'; time?: number }) => {
    console.log('[수신] 동기화 이벤트:', data);

    if (!videoRef.current) return;

    // 이 변경은 외부에서 온 것이므로 다음 onPlay/onSeeked 동작은 무시
    isRemoteChangeRef.current = true;

    switch (data.type) {
      case 'PLAY':
        videoRef.current.play();
        break;
      case 'PAUSE':
        videoRef.current.pause();
        break;
      case 'SEEK':
        if (typeof data.time === 'number') {
          videoRef.current.currentTime = data.time;
        }
        break;
    }
  };

  // 소켓 연결 및 발행 함수
  const { send: sendSync } = useSocket(
    SOCKET_PATHS.SYNC.SEND(channelId),
    SOCKET_PATHS.SYNC.SUBSCRIBE(channelId),
    handleSyncEvent
  );

  // m3u8 URL 연결 (HLS.js)
  useEffect(() => {
    if (!videoRef.current) return;

    const hls = new Hls();
    hls.loadSource(m3u8Url);
    hls.attachMedia(videoRef.current);

    console.log('🎬 HLS 소스 연결:', m3u8Url);

    return () => {
      hls.destroy();
    };
  }, [m3u8Url]);

  // 사용자 조작 시 동기화 이벤트 전송
  const handlePlay = () => {
    // 외부 변경으로 인한 재생이면 전송 생략
    if (isRemoteChangeRef.current) {
      isRemoteChangeRef.current = false;
      return;
    }
    console.log('▶️ [전송] PLAY');
    sendSync({ type: 'PLAY' });
  };

  const handlePause = () => {
    // 외부 변경으로 인한 정지이면 전송 생략
    if (isRemoteChangeRef.current) {
      isRemoteChangeRef.current = false;
      return;
    }
    console.log('⏸️ [전송] PAUSE');
    sendSync({ type: 'PAUSE' });
  };

  const handleSeek = () => {
    if (isRemoteChangeRef.current) {
      isRemoteChangeRef.current = false;
      return;
    }
    if (videoRef.current) {
      console.log('⏩ [전송] SEEK →', videoRef.current.currentTime);
      sendSync({ type: 'SEEK', time: videoRef.current.currentTime });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <video
        ref={videoRef}
        className="w-full rounded-2xl shadow"
        controls
        onPlay={handlePlay}
        onPause={handlePause}
        onSeeked={handleSeek}
      />
    </div>
  );
};

export default ChannelStreamingPlayer;
