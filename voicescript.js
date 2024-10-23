// Lấy phần tử voice từ DOM
const elem = document.getElementById("voice");

// Khởi tạo SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "vi-VN";//en-GB
recognition.continuous = true; // Nhận diện liên tục.
// Lấy phần tử button từ DOM
const startButton = document.getElementById("start-recognition");
const stopButton = document.getElementById("stop-recognition");

// Sự kiện khi người dùng nhấn nút để bắt đầu nhận diện giọng nói
startButton.onclick = function () {
    recognition.start(); // Bắt đầu nhận diện giọng nói
    startButton.disabled= true;
    stopButton.disabled= false;
    startButton.innerText="Tiếp tục";    
    console.log("Speech recognition started...");
}

// Xử lý khi có kết quả nhận diện giọng nói
recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript; // Lấy đoạn transcript mới nhất
        const words = transcript.split(" "); // Tách từng từ trong đoạn nhận diện

        // Hiển thị từng từ với độ trễ 0.75 giây
        words.forEach((word, index) => {
            setTimeout(() => {
                elem.value += " "+word; // Thêm từng từ sau mỗi 0.02 giây
            }, 200 * index); // Độ trễ 0.02 giây cho mỗi từ
        }); // Hiển thị đoạn văn trong textarea và xuống dòng mỗi lần nhận diện
    };

// Sự kiện khi người dùng nhấn nút để để kết thúc nhận diện giọng nói

stopButton.onclick = function () {
    recognition.stop(); // ngưng nhận diện giọng nói
    startButton.disabled= false;
    stopButton.disabled= true;
    recognition.onend = () => {
        console.log("Speech recognition ended");
    };
};
// Xử lý lỗi hoặc việc dừng nhận diện
recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
};

