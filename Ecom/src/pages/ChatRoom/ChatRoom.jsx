import React, { useState, useEffect, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import Layout from "../../components/Layout/Layout";
import { format } from "date-fns";

const ChatPage = () => {
  const [groupedMessages, setGroupedMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;
  const messagesContainerRef = useRef(null); // Ref for messages container

  useEffect(() => {
    const messagesRef = ref(db, "messages");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const groupedData = {};

      for (let id in data) {
        const message = { id, ...data[id] };
        const messageDate = format(
          new Date(message.timestamp || Date.now()),
          "yyyy-MM-dd"
        );

        if (!groupedData[messageDate]) {
          groupedData[messageDate] = [];
        }
        groupedData[messageDate].push(message);
      }

      setGroupedMessages(groupedData);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [db]);

  useEffect(() => {
    // Scroll to bottom only if the user is at the bottom
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [groupedMessages, isAtBottom]); // Scroll when messages change

  const handleSendMessage = () => {
    const messagesRef = ref(db, "messages");
    if (newMessage.trim() && user) {
      push(messagesRef, {
        text: newMessage,
        senderName: user.displayName || "Anonymous",
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
      // Scroll to bottom only if the user is at the bottom
      if (isAtBottom) {
        scrollToBottom();
      }
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = messagesContainerRef.current;
    // Check if user is at the bottom
    setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 1);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[80vh] bg-white relative">
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll} // Add scroll event listener
          className="flex-1 overflow-y-scroll p-4 scrollbar-hide"
        >
          <div className="space-y-4">
            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                <div className="text-center text-gray-500 mb-2">
                  {format(new Date(date), "EEEE, MMMM d, yyyy")}
                </div>
                {groupedMessages[date].map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 mb-3 rounded-lg shadow-md ${
                      msg.senderName === user?.displayName
                        ? "bg-blue-200 w-4/6 ml-auto"
                        : "bg-gray-300 w-4/6"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-gray-800">
                        {msg.senderName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp
                          ? new Date(msg.timestamp).toLocaleTimeString()
                          : "Just now"}
                      </span>
                    </div>
                    <p className="text-gray-700 break-words">{msg.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex p-4 border-t border-gray-300 bg-white">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 p-2 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
          <div className="flex justify-center items-center ml-2 w-10 h-10 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 cursor-pointer">
            <FaArrowDown
              className="text-white text-lg"
              onClick={scrollToBottom}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
