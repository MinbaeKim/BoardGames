import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyD_OzqoWDbo1Gq5QLu2ckoFl3FyQ9scpa4",
  authDomain: "board-game-e3961.firebaseapp.com",
  projectId: "board-game-e3961",
  storageBucket: "board-game-e3961.firebasestorage.app",
  messagingSenderId: "809236948799",
  appId: "1:809236948799:web:07621cfe11fbe838b6d58a",
  measurementId: "G-ZB6FL5BP5P"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const backButton = document.getElementById('back-button');

    // 글 작성
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const author = document.getElementById('post-author').value;
        const date = new Date().toISOString();

        if (title && content && author) {
            try {
                await addDoc(collection(db, "posts"), { title, content, author, date });
                alert('글이 작성되었습니다!');
                window.location.href = 'index.html';
            } catch (error) {
                console.error("게시글 저장 실패:", error);
                alert('글 작성 중 오류가 발생했습니다.');
            }
        } else {
            alert('모든 필드를 입력해주세요!');
        }
    });

    // 목록 페이지로 돌아가기
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
