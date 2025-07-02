//일기
import SpeechRecognition, { useSpeechRecognition as useSR } from "react-speech-recognition";

export function useSpeechRecognition() {
  const { transcript, listening, resetTranscript } = useSR();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: false, language: "ko-KR" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
  };
}
