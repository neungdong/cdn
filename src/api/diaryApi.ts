//일기
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/diary";

// 쿠키 기반 인증이므로 withCredentials: true 설정!
export async function composeDiary(content: string) {
  const response = await axios.post(
    `${API_BASE_URL}/compose`,
    { content },
    {
      withCredentials: true, // 쿠키 자동 포함
    }
  );
  return response.data;
}

