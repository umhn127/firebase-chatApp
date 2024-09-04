import { useEffect } from "react";
import { auth, db } from "./../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
import Message from "../components/Message";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  // formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();

    // kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // kolleksiyona yeni belge ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      sender: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // formu sıfırla
    e.target.reset();
  };

  // mevcut odada gönderilen mesajların verisini anlık olarak al
  useEffect(() => {
    // hangi kolleksiyondaki verileri istiyorsak o kolleksiyonun referansını alırız
    const messagesCol = collection(db, "messages");

    // sorgu oluştur
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    // kolleksiyondaki verileri al
    onSnapshot(q, messagesCol, (snapshot) => {
      // verilerin geçici olarak tutulacağı dizi
      const tempMsg = [];
      // dökümanları dön,verilere eriş
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data());
      });
      // güncel mesajları state e aktar
      setMessages(tempMsg);
    });
  }, []);
  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.map((data, i) => (
          <Message key={i} data={data} />
        ))}
      </main>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="mesajınızı yazınız..." />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
