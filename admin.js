import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
    const adminPostList = document.getElementById('admin-post-list');
    const backButton = document.getElementById('back-button');

    // Firestore에서 게시글 데이터 가져오기
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

    // 게시글 삭제
    const deletePost = async (postId) => {
        try {
            await deleteDoc(doc(db, "posts", postId));
            alert("글이 삭제되었습니다.");
            renderPosts(); // 삭제 후 목록 갱신
        } catch (error) {
            console.error("게시글 삭제 실패:", error);
        }
    };

    // 게시글 목록 렌더링
    const renderPosts = async () => {
        const posts = await fetchPosts();
        adminPostList.innerHTML = '';
        posts.forEach((post, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${post.title}</td>
                <td>${post.author || '익명'}</td>
                <td>${post.date || 'N/A'}</td>
                <td><button class="delete-post-button" data-id="${post.id}">삭제</button></td>
            `;
            adminPostList.appendChild(row);
        });

        // 삭제 버튼 이벤트
        document.querySelectorAll('.delete-post-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = e.target.dataset.id;
                deletePost(postId);
            });
        });
    };

    // 목록으로 돌아가기
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    renderPosts();
});
