import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', async () => {
    const postList = document.getElementById('post-list');
    const createButton = document.getElementById('create-button');

    // Firestore에서 데이터 가져오기
    const fetchPosts = async () => {
        const posts = [];
        try {
            const querySnapshot = await getDocs(collection(db, "posts"));
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() });
            });
        } catch (error) {
            console.error("게시글 로드 실패:", error);
        }
        return posts;
    };

    // 글 목록 렌더링
    const renderPosts = (posts) => {
        postList.innerHTML = '';
        posts.slice().reverse().forEach((post, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${posts.length - index}</td>
                <td><a href="post.html" data-id="${post.id}">${post.title}</a></td>
                <td>${post.author || '익명'}</td>
                <td>${post.date || 'N/A'}</td>
            `;
            row.querySelector('a').addEventListener('click', () => {
                localStorage.setItem('currentPostId', post.id);
            });
            postList.appendChild(row);
        });
    };

    // Firestore 데이터 가져오기 및 렌더링
    const posts = await fetchPosts();
    renderPosts(posts);

    // 글 작성 페이지로 이동
    createButton.addEventListener('click', () => {
        window.location.href = 'create.html';
    });
});
