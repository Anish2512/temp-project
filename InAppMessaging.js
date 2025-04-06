import React, { useState, useEffect } from "react";
import { Search, MessageSquare, PlusCircle } from "lucide-react";
import mockData from "./InAppMessaging.json"; // Sample data file
import "./InAppMessaging.css";

const InAppMessaging = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [showGroupModal, setShowGroupModal] = useState(false);

  const loggedInUser = "Alice"; // Replace with dynamic logged-in user

  useEffect(() => {
    setUsers(mockData.users);
    setGroups(mockData.groups);
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setChatMessages(
      chat.members
        ? chat.messages
        : mockData.messages.filter(
            (m) =>
              (m.sender === loggedInUser && m.receiver === chat.name) ||
              (m.sender === chat.name && m.receiver === loggedInUser)
          )
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newChatMessage = {
      sender: loggedInUser,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setChatMessages([...chatMessages, { ...newChatMessage, receiver: selectedChat?.name }]);
    setNewMessage("");
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const createGroup = () => {
    if (!groupName.trim() || selectedUsers.length < 2) {
      alert("Enter a group name and select at least 2 users.");
      return;
    }

    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      members: [loggedInUser, ...selectedUsers.map((user) => user.name)],
      messages: [],
    };

    setGroups([...groups, newGroup]);
    setShowGroupModal(false);
    setGroupName("");
    setSelectedUsers([]);
  };

  return (
    <div className="messaging-container whatsapp-style">
      <div className="left-panel">
        <div className="search-bar">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search users or groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="create-group-btn" onClick={() => setShowGroupModal(true)}>
            <PlusCircle />
          </button>
        </div>
        <div className="chat-selection">
          {users
            .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((user) => (
              <div key={user.id} className={`chat-item ${selectedChat?.name === user.name ? "active" : ""}`} onClick={() => handleSelectChat(user)}>
                <MessageSquare className="icon" /> {user.name}
              </div>
            ))}
          {groups
            .filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((group) => (
              <div key={group.id} className={`chat-item ${selectedChat?.name === group.name ? "active" : ""}`} onClick={() => handleSelectChat(group)}>
                <MessageSquare className="icon" /> {group.name}
              </div>
            ))}
        </div>
      </div>

      <div className="right-panel">
        {selectedChat ? (
          <>
            <div className="chat-header">{selectedChat.name}</div>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.sender === loggedInUser ? "sent" : "received"}`}>
                  <div className="message-content">
                    <strong>{msg.sender}</strong>
                    <p>{msg.text}</p>
                    <span className="timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">Select a chat to start messaging</div>
        )}
      </div>

      {showGroupModal && (
        <div className="group-modal">
          <h3>Create Group</h3>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <h4>Select Users:</h4>
          <div className="user-selection">
            {users.map((user) => (
              <label key={user.id}>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user)}
                  onChange={() => toggleUserSelection(user)}
                />
                {user.name}
              </label>
            ))}
          </div>
          <button onClick={createGroup}>Create</button>
          <button className="cancel-btn" onClick={() => setShowGroupModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default InAppMessaging;
