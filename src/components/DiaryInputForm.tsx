// //일기 stt만
// import React, { useState } from "react";
// import { composeDiary } from "../api/diaryApi";
// import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

// const DiaryInputForm: React.FC = () => {
//   const [text, setText] = useState("");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     startListening,
//     stopListening,
//   } = useSpeechRecognition();

//   React.useEffect(() => {
//     if (transcript) setText(transcript);
//   }, [transcript]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await composeDiary(text);
//       setResult(res.data); // ApiResponse의 data
//     } catch (err) {
//       setResult("오류 발생!");
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <h2>오늘의 한마디를 입력하세요</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           rows={4}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="한마디를 입력하거나 마이크를 누르세요"
//         />
//         <div>
//           <button
//             type="button"
//             onClick={() => {
//               resetTranscript();
//               startListening();
//             }}
//             disabled={listening}
//           >
//             🎤 마이크
//           </button>
//           <button type="button" onClick={stopListening} disabled={!listening}>
//             ⏹️ 멈춤
//           </button>
//         </div>
//         <button type="submit" disabled={loading || !text}>
//           {loading ? "생성 중..." : "AI로 일기 생성"}
//         </button>
//       </form>
//       {result && (
//         <div>
//           <h3>AI 생성 일기</h3>
//           <pre>{result}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DiaryInputForm;
import React, { useState } from "react";
import { composeDiary } from "../api/diaryApi";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";

const DiaryInputForm: React.FC = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  React.useEffect(() => {
    if (transcript) setText(transcript);
  }, [transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await composeDiary(text);
      setResult(res.data); // ApiResponse의 data
    } catch (err) {
      setResult("오류 발생!");
    }
    setLoading(false);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h2>오늘의 한마디를 입력하세요</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="한마디를 입력하거나 마이크를 누르세요"
        />
        <div>
          <button
            type="button"
            onClick={() => {
              resetTranscript();
              startListening();
            }}
            disabled={listening}
          >
            🎤 마이크
          </button>
          <button type="button" onClick={stopListening} disabled={!listening}>
            ⏹️ 멈춤
          </button>
        </div>
        <button type="submit" disabled={loading || !text}>
          {loading ? "생성 중..." : "AI로 일기 생성"}
        </button>
      </form>
      {result && (
        <div>
          <h3>AI 생성 일기</h3>
          <pre>{result}</pre>
          <button type="button" onClick={() => speak(result)}>
            🔊 읽어주기
          </button>
        </div>
      )}
    </div>
  );
};

export default DiaryInputForm;
// 이 컴포넌트는 사용자가 일기를 작성하고 AI가 생성한 일기를 읽어주는 기능을 포함합니다.
// 사용자가 입력한 텍스트를 AI에게 보내고, AI가 생성한 일기를 화면에 표시합니다.