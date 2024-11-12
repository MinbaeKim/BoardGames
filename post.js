import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
    const backButton = document.getElementById('back-button');
    const detailTitle = document.getElementById('detail-title');
    const detailAuthor = document.getElementById('detail-author');
    const detailDate = document.getElementById('detail-date');
    const detailContent = document.getElementById('detail-content');
    const editButton = document.getElementById('edit-button');
    const deleteButton = document.getElementById('delete-button');

    // 현재 글 ID 가져오기 (localStorage에 저장된 값 사용)
    const currentPostId = localStorage.getItem('currentPostId');

    if (!currentPostId) {
        alert('유효하지 않은 접근입니다.');
        window.location.href = 'index.html';
        return;
    }

    // Firestore에서 게시글 데이터 가져오기
    const fetchPost = async (postId) => {
        try {
            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                alert("해당 글을 찾을 수 없습니다.");
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error("게시글 불러오기 실패:", error);
            alert("데이터를 불러오는 중 오류가 발생했습니다.");
            window.location.href = 'index.html';
        }
    };

    // 글 상세 데이터 렌더링
    const renderPost = (post) => {
        detailTitle.textContent = post.title || "제목 없음";
        detailAuthor.textContent = post.author || "익명";
        detailDate.textContent = post.date || "날짜 없음";
        detailContent.value = post.content || "내용 없음";
    };

    // 글 데이터 가져오기 및 렌더링
    const post = await fetchPost(currentPostId);
    if (post) {
        renderPost(post);
    }

    // 뒤로가기 버튼
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // 글 수정 버튼
    editButton.addEventListener('click', async () => {
        const newTitle = prompt('새 제목을 입력하세요:', detailTitle.textContent);
        const newContent = prompt('새 내용을 입력하세요:', detailContent.value);

        if (newTitle && newContent) {
            try {
                const docRef = doc(db, "posts", currentPostId);
                await updateDoc(docRef, { title: newTitle, content: newContent });
                alert('글이 수정되었습니다.');
                detailTitle.textContent = newTitle;
                detailContent.value = newContent;
            } catch (error) {
                console.error("글 수정 실패:", error);
                alert("글 수정 중 오류가 발생했습니다.");
            }
        } else {
            alert('수정이 취소되었습니다.');
        }
    });

    // 글 삭제 버튼
    deleteButton.addEventListener('click', async () => {
        if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
            try {
                const docRef = doc(db, "posts", currentPostId);
                await deleteDoc(docRef);
                alert('글이 삭제되었습니다.');
                window.location.href = 'index.html';
            } catch (error) {
                console.error("글 삭제 실패:", error);
                alert("글 삭제 중 오류가 발생했습니다.");
            }
        }
    });
});
