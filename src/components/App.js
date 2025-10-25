import React, { useEffect, useState } from "react";
import Header from "./Header";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

const testUser = { username: "Duane" };
const testResponder = { username: "Liza" };
let randomSentences = [
  {
    "sentence": "The quick brown fox jumps over the lazy dog."
  },
  {
    "sentence": "My Mum tries to be cool by saying that she likes all the same things that I do."
  },
  {
    "sentence": "A purple pig and a green donkey flew a kite in the middle of the night and ended up sunburnt."
  },
  {
    "sentence": "Last Friday I saw a spotted striped blue worm shake hands with a legless lizard."
  },
  {
    "sentence": "A song can make or ruin a person’s day if they let it get to them."
  },
  {
    "sentence": "Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind."
  },
  {
    "sentence": "Writing a list of random sentences is harder than I initially thought it would be."
  }
]; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");


  // useEffect(() => {
  //   fetch("http://127.0.0.1:4000/messages")
  //     .then((r) => r.json())
  //     .then((messages) => setMessages(messages));
    
  //   // set up random sentences once
  //   fetch("http://127.0.0.1:4000/randomSentences")
  //     .then((r) => r.json())
  //     .then((data) => {
  //       randomSentences = data
  //     });
  // }, []);

  function handleAddMessage(newMessage) {
    const randomIndex = Math.floor(Math.random() * randomSentences.length);
    const newSentence = randomSentences[randomIndex].sentence;
    const newResponse = {
      ...testResponder, 
      body: newSentence}
    setMessages([...messages, newMessage, newResponse]);
  }

  function handleDeleteMessage(id) {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
  }

  function handleUpdateMessage(updatedMessageObj) {
    const updatedMessages = messages.map((message) => {
      if (message.id === updatedMessageObj.id) {
        return updatedMessageObj;
      } else {
        return message;
      }
    });
    setMessages(updatedMessages);
  }

  const displayedMessages = messages.filter((message) =>
    message.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className={isDarkMode ? "dark-mode" : ""}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
      <Search search={search} onSearchChange={setSearch} />
      <MessageList
        messages={displayedMessages}
        currentUser={testUser}
        onMessageDelete={handleDeleteMessage}
        onUpdateMessage={handleUpdateMessage}
      />
      <NewMessage currentUser={testUser} onAddMessage={handleAddMessage} />
    </main>
  );
}

export default App;
