const popup = document.querySelector(".popup"),
  wifiIcon = document.querySelector(".icon i"),
  popupTitle = document.querySelector(".popup .title"),
  popupDesc = document.querySelector(".desc"),
  reconnectBtn = document.querySelector(".reconnect");

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false;
  }
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "Соединение восстановлено";
    popupDesc.innerHTML = "Ваше устройство снова поключено к сети интернет.";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }

  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerText = "Соединение прервано";
  popupDesc.innerHTML =
    "Ваша сеть недоступна. Попытка поключиться через <b>10</b> секунд.";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) checkConnection();
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);
