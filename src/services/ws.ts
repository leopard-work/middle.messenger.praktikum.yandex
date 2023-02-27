let WS: WebSocket | null = null;

let WSPing: ReturnType<typeof setInterval> | null = null;

export const wsOpen = (id: number, chatId: number, token: string) => {
  WS = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${id}/${chatId}/${token}`
  );
  WSPing = setInterval(() => {
    WS!.send(
      JSON.stringify({
        type: "ping",
      })
    );
  }, 5000);
  return WS;
};

export const wsClose = () => {
  if (WS) {
    WS.close();
    WS = null;
    if (WSPing) {
      clearInterval(WSPing);
      WSPing = null;
    }
  }
};

export const wsSend = (message: string) => {
  if (WS) {
    WS.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }
};

export default WS;
