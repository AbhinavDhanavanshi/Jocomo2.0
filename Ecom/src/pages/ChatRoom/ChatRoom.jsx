import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  onValue,
  serverTimestamp,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import Layout from "../../components/Layout/Layout";
import { format } from "date-fns"; // Install date-fns for formatting dates

const ChatPage = () => {
  const [groupedMessages, setGroupedMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const messagesRef = ref(db, "messages");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const groupedData = {};

      for (let id in data) {
        const message = { id, ...data[id] };
        const messageDate = format(
          new Date(message.timestamp || Date.now()),
          "yyyy-MM-dd"
        ); // Format as 'YYYY-MM-DD'

        if (!groupedData[messageDate]) {
          groupedData[messageDate] = [];
        }
        groupedData[messageDate].push(message);
      }

      setGroupedMessages(groupedData);
    });
  }, [db]);

  const handleSendMessage = () => {
    const messagesRef = ref(db, "messages");
    if (newMessage.trim() && user) {
      push(messagesRef, {
        text: newMessage,
        senderName: user.displayName || "Anonymous",
        timestamp: serverTimestamp(),
      });
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[80vh] bg-white">
        <div className="flex-1 overflow-y-scroll p-4">
          <div className="space-y-4">
            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                {/* Date Header */}
                <div className="text-center text-gray-500 mb-2">
                  {format(new Date(date), "EEEE, MMMM d, yyyy")} {/* e.g., Monday, January 1, 2023 */}
                </div>
                {/* Messages for that date */}
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
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
