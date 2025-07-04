
import React, { useEffect, useState } from "react";
import axios from "axios";
import ChannelStreamingPlayer from "../components/ChannelStreamingPlayer";

interface Channel {
  id: string;
  name: string;
  m3u8Url: string;
}

const StreamingDemoPage: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // 채널 리스트 불러오기
  const fetchChannels = () => {
    axios.get("http://localhost:8080/api/channels").then((res) => {
      const mapped = res.data.map(
        (ch: { id: string | number; title: string; videoUrl: string }) => ({
          id: String(ch.id),
          name: ch.title,
          m3u8Url: ch.videoUrl,
        })
      );
      setChannels(mapped);
    });
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const createTestChannel = async () => {
    await axios.post("http://localhost:8080/api/channels", {
      title: "테스트 채널",
      hostId: 1,
    });
    fetchChannels();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">채널 목록</h1>

      <button
        onClick={createTestChannel}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        테스트 채널 생성하기
      </button>

      <ul className="space-y-2 mb-6">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className="cursor-pointer text-blue-600 underline"
            onClick={() => setSelectedChannel(channel)}
          >
            {channel.name}
          </li>
        ))}
      </ul>

      {selectedChannel && (
        <>
          <h2 className="text-lg font-semibold mb-2">{selectedChannel.name} 스트리밍</h2>

          {/* ✅ 콘솔 로그 추가: 선택된 채널 확인 */}
          {console.log("🎥 선택된 채널 정보:", selectedChannel)}

          <ChannelStreamingPlayer
            channelId={selectedChannel.id}
            m3u8Url={selectedChannel.m3u8Url}
          />
        </>
      )}
    </div>
  );
};

export default StreamingDemoPage;
