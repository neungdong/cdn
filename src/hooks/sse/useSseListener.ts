// import { useEffect } from 'react';
// import useSseEventBusStore from '../../store/useSseEventBusStore';
// import type { SseEventPayloadMap, SseEventType } from './sseEventType';

// const useSseListener = <K extends SseEventType>(
//   eventType: K,
//   callback: (payload: SseEventPayloadMap[K]) => void
// ) => {
//   const { on, off } = useSseEventBusStore();

//   useEffect(() => {
//     on(eventType, callback);

//     return () => {
//       off(eventType, callback);
//     };
//   }, [eventType]);
// };

// export default useSseListener;
import { useEffect } from "react";
import useSseEventBusStore from "../../store/useSseEventBusStore";

export function useSseListener(event: string, callback: (data: string) => void) {
  const on = useSseEventBusStore((state) => state.on);
  const off = useSseEventBusStore((state) => state.off);

  useEffect(() => {
    on(event, callback);
    return () => {
      off(event, callback);
    };
  }, [event, callback, on, off]);
}

export default useSseListener;