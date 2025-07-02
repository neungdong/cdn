// import axios from "axios";
// import { useEffect } from "react";

// const API_BASE_URL = "http://localhost:8080/api/chat";

// // SSE 연결 및 이벤트 수신 (커스텀 훅 형태)
// export function useChatSSE(roomId: unknown, onMessage: (type: string, data: string) => void) {
//   useEffect(() => {
//     const eventSource = new EventSource(`${API_BASE_URL}/connect/${roomId}`, {
//       withCredentials: true,
//     });

//     eventSource.addEventListener("question", (e) => onMessage("user", e.data));
//     eventSource.addEventListener("answer", (e) => onMessage("ai", e.data));
//     eventSource.addEventListener("summary", (e) => onMessage("system", `[요약] ${e.data}`));
//     eventSource.addEventListener("stream_chat", (e) => onMessage("ai_stream", e.data)); // 추가
//     eventSource.addEventListener("done", (e) => onMessage("done", e.data)); // ✅ 새로 추가

//     eventSource.onerror = (err) => console.error("SSE 연결 오류:", err);

//     return () => eventSource.close();
//   }, [roomId, onMessage]);
// }

// // // 메시지 전송 함수
// // export async function sendChatMessage(roomId: string, content: string) {
// //   await axios.post(`${API_BASE_URL}/message/${roomId}`, content, { withCredentials: true });
// // }
// // 메시지 전송 함수
// export async function sendChatMessage(roomId: string, content: string) {
//   await axios.post(
//     `${API_BASE_URL}/message/${roomId}`,
//     { content },
//     {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//     }
//   );
// }
// // 요약 요청 함수
// export async function requestSummary(roomId: string) {
//   await axios.post(`${API_BASE_URL}/summary/${roomId}`, {}, { withCredentials: true });
// }
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/chat";

export async function sendChatMessage(roomId: string, content: string) {
  await axios.post(
    `${API_BASE_URL}/message/${roomId}`,
    { content },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function requestSummary(roomId: string) {
  await axios.post(`${API_BASE_URL}/summary/${roomId}`, {}, { withCredentials: true });
}
