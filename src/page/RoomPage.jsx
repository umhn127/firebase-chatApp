const RoomPage = ({ setIsAuth, setRoom }) => {
  // oturumdan çıkış yap
  const logout = () => {
    // state i güncelle
    setIsAuth(false);
    //locali temizle
    localStorage.removeItem("token");
  };
  // odaya gir
  const handleSubmit = (e) => {
    //sayfa yenilemeyi engelle
    e.preventDefault();

    //inputtaki değeri al
    const room = e.target[0].value.toLowerCase();
    // girilecek odanın state ini güncelle
    setRoom(room);
  };
  return (
    <form onSubmit={handleSubmit} className="room-form">
      <h1>Chat Odası</h1>
      <p>Hangi Odaya Gireceksiniz?</p>

      <input type="text" placeholder="örn:frontend" required />

      <button>Odaya Gir</button>
      <button onClick={logout}>Çıkış Yap</button>
    </form>
  );
};

export default RoomPage;
