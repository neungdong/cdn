// // import React, { useState, useCallback, useEffect } from "react";
// // import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
// // import { requestSummary, sendChatMessage, useChatSSE } from "../api/chatApi";

// // const ChatRoom: React.FC = () => {
// //   const [roomId, setRoomId] = useState("exercise"); // 기본 채팅방 ID
// //   const [input, setInput] = useState("");
// //   const [messages, setMessages] = useState<Array<{sender: string, text: string}>>([]);
// //   const [loading, setLoading] = useState(false);

// //   // 음성 인식
// //   const {
// //     transcript,
// //     listening,
// //     resetTranscript,
// //     startListening,
// //     stopListening,
// //   } = useSpeechRecognition();

// //   // 음성 인식 결과 반영
// //   useEffect(() => {
// //     if (transcript) setInput(transcript);
// //   }, [transcript]);

// //   // SSE로 메시지 수신
// //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //   const onMessage = useCallback((sender: any, text: any) => {
// //     setMessages((prev) => [...prev, { sender, text }]);
// //   }, []);

// //   useChatSSE(roomId, onMessage);

// //   // 메시지 전송
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;
// //     setLoading(true);
// //     try {
// //       await sendChatMessage(roomId, input);
// //       setInput("");
// //     } catch (err) {
// //       alert("메시지 전송 실패");
// //     }
// //     setLoading(false);
// //   };

// //   // 요약 요청
// //   const handleSummary = async () => {
// //     setLoading(true);
// //     try {
// //       await requestSummary(roomId);
// //     } catch (err) {
// //       alert("요약 요청 실패");
// //     }
// //     setLoading(false);
// //   };

// //   // 음성 읽기
// //   const speak = (text: string) => {
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = "ko-KR";
// //     window.speechSynthesis.speak(utterance);
// //   };

// //   return (
// //     <div>
// //       <h2>실시간 AI 채팅방 ({roomId})</h2>
// //       <div>
// //         <label>
// //           채팅방 ID:
// //           <input
// //             type="text"
// //             value={roomId}
// //             onChange={(e) => setRoomId(e.target.value)}
// //           />
// //         </label>
// //       </div>
// //       <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
// //         {messages.map((msg, idx) => (
// //           <div key={idx} style={{ margin: "5px 0" }}>
// //             <b>{msg.sender}:</b> {msg.text}
// //             {msg.sender === "ai" && (
// //               <button onClick={() => speak(msg.text)} style={{ marginLeft: "10px" }}>
// //                 🔊 읽어주기
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <textarea
// //           rows={4}
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="메시지를 입력하거나 마이크를 누르세요"
// //         />
// //         <div>
// //           <button
// //             type="button"
// //             onClick={() => {
// //               resetTranscript();
// //               startListening();
// //             }}
// //             disabled={listening}
// //           >
// //             🎤 마이크
// //           </button>
// //           <button type="button" onClick={stopListening} disabled={!listening}>
// //             ⏹️ 멈춤
// //           </button>
// //         </div>
// //         <button type="submit" disabled={loading || !input.trim()}>
// //           {loading ? "전송 중..." : "전송"}
// //         </button>
// //         <button type="button" onClick={handleSummary} disabled={loading}>
// //           요약하기
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ChatRoom;

// //이벤트버스로 분리전
// // import React, { useState, useCallback, useEffect } from "react";
// // import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
// // import { requestSummary, sendChatMessage, useChatSSE } from "../api/chatApi";

// // type Message = { sender: string, text: string };

// // const ChatRoom: React.FC = () => {
// //   const [roomId, setRoomId] = useState("exercise");
// //   const [input, setInput] = useState("");
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [isStreaming, setIsStreaming] = useState(false);
// //   const [streamingMessage, setStreamingMessage] = useState<string | null>(null);

// //   // 음성 인식
// //   const {
// //     transcript,
// //     listening,
// //     resetTranscript,
// //     startListening,
// //     stopListening,
// //   } = useSpeechRecognition();

// //   useEffect(() => {
// //     if (transcript) setInput(transcript);
// //   }, [transcript]);

// //   // SSE로 메시지 수신
// //  const onMessage = useCallback((type: string, data: string) => {
// //   if (type === "ai_stream") {
// //     setIsStreaming(true);
// //     setStreamingMessage(prev => {
// //       const newText = (prev ?? "") + data;
// //       setMessages(prevMessages => {
// //         if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].sender === "ai") {
// //           const updated = [...prevMessages];
// //           updated[updated.length - 1] = {
// //             ...updated[updated.length - 1],
// //             text: newText
// //           };
// //           return updated;
// //         } else {
// //           return [...prevMessages, { sender: "ai", text: newText }];
// //         }
// //       });
// //       return newText;
// //     });
// //   } else if (type === "done") {
// //     setIsStreaming(false);
// //     setStreamingMessage(null);
// //   } else {
// //     setIsStreaming(false);
// //     setStreamingMessage(null);
// //     setMessages(prev => [...prev, { sender: type === "user" ? "user" : "ai", text: data }]);
// //   }
// // }, []);

// //   useChatSSE(roomId, onMessage);

// //   // 메시지 전송
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;
// //     setLoading(true);
// //       // 사용자가 입력한 메시지를 바로 화면에 추가
// //   setMessages(prev => [...prev, { sender: "user", text: input }]);

// //     try {
// //       await sendChatMessage(roomId, input);
// //       setInput("");
// //     } catch (err) {
// //       alert("메시지 전송 실패");
// //     }
// //     setLoading(false);
// //   };

// //   // 요약 요청
// //   const handleSummary = async () => {
// //     setLoading(true);
// //     try {
// //       await requestSummary(roomId);
// //     } catch (err) {
// //       alert("요약 요청 실패");
// //     }
// //     setLoading(false);
// //   };

// //   // 음성 읽기
// //   const speak = (text: string) => {
// //     const utterance = new SpeechSynthesisUtterance(text);
// //     utterance.lang = "ko-KR";
// //     window.speechSynthesis.speak(utterance);
// //   };

// //   return (
// //     <div>
// //       <h2>실시간 AI 채팅방 ({roomId})</h2>
// //       <div>
// //         <label>
// //           채팅방 ID:
// //           <input
// //             type="text"
// //             value={roomId}
// //             onChange={(e) => setRoomId(e.target.value)}
// //           />
// //         </label>
// //       </div>
// //       <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
// //         {messages.map((msg, idx) => (
// //           <div key={idx} style={{ margin: "5px 0" }}>
// //             <b>{msg.sender}:</b> {msg.text}
// //             {msg.sender === "ai" && (
// //               <button onClick={() => speak(msg.text)} style={{ marginLeft: "10px" }}>
// //                 🔊 읽어주기
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //       </div>
// //       <form onSubmit={handleSubmit}>
// //         <textarea
// //           rows={4}
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="메시지를 입력하거나 마이크를 누르세요"
// //         />
// //         <div>
// //           <button
// //             type="button"
// //             onClick={() => {
// //               resetTranscript();
// //               startListening();
// //             }}
// //             disabled={listening}
// //           >
// //             🎤 마이크
// //           </button>
// //           <button type="button" onClick={stopListening} disabled={!listening}>
// //             ⏹️ 멈춤
// //           </button>
// //         </div>
// //         <button type="submit" disabled={loading || !input.trim()}>
// //           {loading ? "전송 중..." : "전송"}
// //         </button>
// //         <button type="button" onClick={handleSummary} disabled={loading}>
// //           요약하기
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ChatRoom;
// import React, { useState, useCallback, useEffect, useRef } from "react";
// import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
// import { requestSummary, sendChatMessage } from "../api/chatApi";

// import { useSseListener } from "../hooks/sse/useSseListener";
// import useSse from "../hooks/sse/useSse";

// type Message = { sender: string; text: string };

// const ChatRoom: React.FC = () => {
//   const [roomId, setRoomId] = useState("exercise");
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isStreaming, setIsStreaming] = useState(false);

//   const [lastUserMessage, setLastUserMessage] = useState<string | null>(null); // ⭐ 중복 방지용 상태

//   const { transcript, listening, resetTranscript, startListening, stopListening } =
//     useSpeechRecognition();

//   // 스크롤 ref
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (transcript) setInput(transcript);
//   }, [transcript]);

//   useSse();

//   // 자동 스크롤
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const onStreamChat = useCallback((data: string) => {
//     setIsStreaming(true);
//     setStreamingMessage((prev) => {
//       const newText = (prev ?? "") + data;
//       setMessages((prevMessages) => {
//         if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].sender === "ai") {
//           const updated = [...prevMessages];
//           updated[updated.length - 1] = { ...updated[updated.length - 1], text: newText };
//           return updated;
//         } else {
//           return [...prevMessages, { sender: "ai", text: newText }];
//         }
//       });
//       return newText;
//     });
//   }, []);

//   const onDone = useCallback(() => {
//     setIsStreaming(false);
//     setStreamingMessage(null);
//   }, []);

//   const onOtherMessages = useCallback(
//     (data: string, type: string) => {
//       setIsStreaming(false);
//       setStreamingMessage(null);

//       // ⭐ "question"은 중복 방지
//       if (type === "question") {
//         if (lastUserMessage === data) {
//           console.log("중복된 사용자 메시지 무시:", data);
//           return;
//         }
//       }

//       setMessages((prev) => [...prev, { sender: type === "question" ? "user" : "ai", text: data }]);

//       // ⭐ "question"일 경우 마지막 메시지 저장
//       if (type === "question") {
//         setLastUserMessage(data);
//       }
//     },
//     [lastUserMessage]
//   );

//   useSseListener("stream_chat", onStreamChat);
//   useSseListener("done", onDone);
//   useSseListener("question", (data) => onOtherMessages(data, "question"));
//   useSseListener("answer", (data) => onOtherMessages(data, "answer"));
//   useSseListener("summary", (data) => onOtherMessages(`[요약] ${data}`, "summary"));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setLoading(true);
//     setMessages((prev) => [...prev, { sender: "user", text: input }]);
//     setLastUserMessage(input); // ⭐ 마지막 사용자 메시지 저장
//     try {
//       await sendChatMessage(roomId, input);
//       setInput("");
//     } catch {
//       alert("메시지 전송 실패");
//     }
//     setLoading(false);
//   };

//   const handleSummary = async () => {
//     setLoading(true);
//     try {
//       await requestSummary(roomId);
//     } catch {
//       alert("요약 요청 실패");
//     }
//     setLoading(false);
//   };

//   const speak = (text: string) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "ko-KR";
//     window.speechSynthesis.speak(utterance);
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
//       <h2 style={{ textAlign: "center" }}>💬 실시간 AI 채팅방 ({roomId})</h2>

//       <div style={{ marginBottom: 10 }}>
//         <label>
//           채팅방 ID:{" "}
//           <input
//             type="text"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             disabled={isStreaming || loading}
//           />
//         </label>
//       </div>

//       <div
//         style={{
//           height: "400px",
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           padding: 10,
//           borderRadius: "8px",
//           background: "#fafafa",
//         }}
//       >
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             style={{
//               margin: "10px 0",
//               display: "flex",
//               justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
//             }}
//           >
//             <div
//               style={{
//                 maxWidth: "70%",
//                 padding: "10px",
//                 borderRadius: "16px",
//                 background: msg.sender === "user" ? "#dcf8c6" : "#ececec",
//                 position: "relative",
//               }}
//             >
//               <div style={{ fontSize: "14px", color: "#555", marginBottom: 5 }}>
//                 {msg.sender === "user" ? "🙋‍♂️ 나" : msg.sender === "ai" ? "🤖 AI" : msg.sender}
//               </div>
//               <div style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
//               {msg.sender === "ai" && (
//                 <button
//                   onClick={() => speak(msg.text)}
//                   style={{
//                     position: "absolute",
//                     bottom: "4px",
//                     right: "6px",
//                     fontSize: "12px",
//                     background: "transparent",
//                     border: "none",
//                     cursor: "pointer",
//                   }}
//                 >
//                   🔊
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={bottomRef} />
//       </div>

//       <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
//         <textarea
//           rows={4}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="메시지를 입력하거나 마이크를 누르세요"
//           disabled={loading}
//           style={{ width: "100%", borderRadius: "8px", padding: "10px" }}
//         />
//         <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
//           <button
//             type="button"
//             onClick={() => {
//               resetTranscript();
//               startListening();
//             }}
//             disabled={listening || loading}
//           >
//             🎤 마이크
//           </button>
//           <button type="button" onClick={stopListening} disabled={!listening || loading}>
//             ⏹️ 멈춤
//           </button>
//           <button type="submit" disabled={loading || !input.trim()}>
//             {loading ? "전송 중..." : "전송"}
//           </button>
//           <button type="button" onClick={handleSummary} disabled={loading}>
//             요약하기
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // streamingMessage 상태를 위한 useState와 setter 구현
// const [streamingMessage, setStreamingMessage] = useState<string | null>(null);

// export default ChatRoom;
// function setStreamingMessage(arg0: (prev: any) => string) {
//   throw new Error("Function not implemented.");
// }
