/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
/** Socket initialization */
import { io, Socket } from 'socket.io-client';
// "undefined" means the URL will be computed from the `window.location` object

const useSocket = (url: string, path: string) => {
  const token = Cookies.get('smartkmsystemAuthClient');

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  /** Map of event name and event data */
  const [data, setData] = useState({});

  /** List of event name to be listened */
  const [events, setEvents] = useState<string[]>([]);

  // INITIALIZE SOCKET WITH USER TOKEN
  const initiate = () => {
    setSocket(
      io(url, {
        path,
        extraHeaders: {
          authorization: token as string,
        },
        secure: true,
      })
    );
  };

  // CONNECT SOCKET
  const connect = () => {
    if (socket) {
      socket.connect();
    }
  };

  // DISCONNECT SOCKET
  const disconnect = () => {
    if (socket && isConnected) {
      socket.disconnect();
    }
  };

  // DEFAULT LISTEN SOCKET
  useEffect(() => {
    if (!socket) return;

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(value: string) {
      setEvents((previous) => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(token as string, onEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(token, onEvent);
    };
  }, [socket, token]);

  // REGISTER EVENT
  const resetEvents = () => {
    socket!.removeAllListeners();
    setData([]);
  };

  const register = (eventName: string) => {
    if (!socket) return;

    resetEvents();

    if (events.includes(eventName)) return;

    setEvents((previous) => [...previous, eventName]);
  };

  // LISTEN EVENTS
  useEffect(() => {
    if (!socket) return;

    type TempData = Record<string, Socket[]>;
    for (const event of events) {
      socket.on(event, (eventData) => {
        setData(() => {
          const temp: TempData = {};
          temp[event] = eventData;

          return temp;
        });
      });
    }
    return () => {
      for (const event of events) {
        socket.off(event, (eventData: Socket) => {
          setData((prev) => {
            const temp: TempData = { ...prev };
            if (temp[event]) {
              temp[event].push(eventData);
            } else {
              temp[event] = [eventData];
            }
            return temp;
          });
        });
      }
    };
  }, [events, socket]);

  return {
    data,
    events,
    isConnected,
    connect,
    disconnect,
    initiate,
    register,
  };
};

export default useSocket;
