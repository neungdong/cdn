//소켓
import { useCallback, useEffect } from "react";
import { socketClient } from "../../libs/socket/socketClient";

const useSocket = <TSend, TReceive>(
  sendPath: string,
  subscribePath: string,
  onReceived: (event: TReceive) => void,
  onSend?: (event: TSend) => void
) => {
  useEffect(() => {
    socketClient.subscribe<TReceive>(subscribePath, onReceived);

    return () => {
      socketClient.unsubscribe(subscribePath);
    };
  }, [subscribePath]);

  const send = useCallback(
    (event: TSend) => {
      socketClient.publish(sendPath, event);
      onSend?.(event);
    },
    [sendPath]
  );

  return { send };
};

export default useSocket;














// 디버깅용
// import { useCallback, useEffect } from "react";
// import { socketClient } from "../../libs/socket/socketClient";

// const useSocket = <TSend, TReceive>(
//   sendPath: string,
//   subscribePath: string,
//   onReceived: (event: TReceive) => void,
//   onSend?: (event: TSend) => void
// ) => {
//   useEffect(() => {
//     console.log(`🔌 [소켓] 구독 요청: ${subscribePath}`); // ✅ 구독 로그
//     socketClient.subscribe<TReceive>(subscribePath, (message) => {
//       console.log("📨 [소켓] 메시지 수신:", message); // ✅ 수신 메시지 로그
//       onReceived(message);
//     });

//     return () => {
//       console.log(`❌ [소켓] 구독 해제: ${subscribePath}`); // ✅ 해제 로그
//       socketClient.unsubscribe(subscribePath);
//     };
//   }, [subscribePath]);

//   const send = useCallback(
//     (event: TSend) => {
//       console.log("📤 [소켓] 전송:", sendPath, event); // ✅ 발행 로그
//       socketClient.publish(sendPath, event);
//       onSend?.(event);
//     },
//     [sendPath]
//   );

//   return { send };
// };

// export default useSocket;
