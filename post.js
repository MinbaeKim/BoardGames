document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    const detailTitle = document.getElementById('detail-title');
    const detailAuthor = document.getElementById('detail-author');
    const detailDate = document.getElementById('detail-date');
    const detailContent = document.getElementById('detail-content');
    const editButton = document.getElementById('edit-button');
    const deleteButton = document.getElementById('delete-button');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const currentPostId = localStorage.getItem('currentPostId');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('comment-list');
    const commentAuthor = document.getElementById('comment-author');
    const commentsPerPage = 10; // 한 페이지에 표시할 댓글 수
    let currentPage = 1;

    if (currentPostId === null) {
        alert('유효하지 않은 접근입니다.');
        window.location.href = 'index.html';
        return;
    }

    const currentPost = posts.find(post => post.id == currentPostId);

    // 상세 정보 렌더링
    detailTitle.textContent = currentPost.title;
    detailAuthor.textContent = currentPost.author || '익명';
    detailDate.textContent = currentPost.date || 'N/A';
    detailContent.textContent = currentPost.content;

    // 뒤로가기 버튼
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // 수정 기능
    editButton.addEventListener('click', () => {
        const newTitle = prompt('새 제목을 입력하세요:', currentPost.title);
        const newContent = prompt('새 내용을 입력하세요:', currentPost.content);
        if (newTitle && newContent) {
            currentPost.title = newTitle;
            currentPost.content = newContent;
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('글이 수정되었습니다.');
            detailTitle.textContent = newTitle;
            detailContent.textContent = newContent;
        } else {
            alert('수정이 취소되었습니다.');
        }
    });

    // 삭제 기능
    deleteButton.addEventListener('click', () => {
        if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
            const index = posts.findIndex(post => post.id == currentPostId);
            if (index !== -1) {
                posts.splice(index, 1); // 글 삭제
                localStorage.setItem('posts', JSON.stringify(posts));
                alert('글이 삭제되었습니다.');
                window.location.href = 'index.html';
            } else {
                alert('글을 찾을 수 없습니다.');
            }
        }
    });

     // 댓글 렌더링 (페이지별로 표시)
     const renderComments = () => {
        commentList.innerHTML = '';
        const comments = currentPost.comments || [];
        const startIndex = (currentPage - 1) * commentsPerPage;
        const endIndex = Math.min(startIndex + commentsPerPage, comments.length);

        comments.slice(startIndex, endIndex).forEach(comment => {
            const li = document.createElement('li');
            li.textContent = comment;
            commentList.appendChild(li);
        });
 

        renderPagination(comments.length);
    };

    // 댓글 페이지네이션 렌더링
    const renderPagination = (totalComments) => {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = ''; // 기존 버튼 제거

        const totalPages = Math.ceil(totalComments / commentsPerPage);

        // 이전 버튼
        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = '이전';
            prevButton.addEventListener('click', () => {
                currentPage--;
                renderComments();
            });
            paginationContainer.appendChild(prevButton);
        }

        // 다음 버튼
        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = '다음';
            nextButton.addEventListener('click', () => {
                currentPage++;
                renderComments();
            });
            paginationContainer.appendChild(nextButton);
        }
    };

    // 댓글 작성 이벤트
    const handleCommentSubmit = () => {
        const author = commentAuthor.value.trim();
        const text = commentInput.value.trim();
        const date = new Date().toISOString().replace('T', ' ').split('.')[0]; // 연-월-일 시:분:초

        if (author && text) {
            currentPost.comments = currentPost.comments || [];
            currentPost.comments.push({ author, text, date });
            localStorage.setItem('posts', JSON.stringify(posts));
            renderComments();
            commentAuthor.value = ''; // 입력 칸 초기화
            commentInput.value = ''; // 입력 칸 초기화
        } else {
            alert('작성자와 댓글 내용을 모두 입력해주세요!');
        }
    };

    // 엔터 키로 댓글 작성
    commentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 폼 제출 방지
            handleCommentSubmit();
        }
    });

    // 폼 제출로 댓글 작성 (버튼 클릭)
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleCommentSubmit();
    });

    // 뒤로가기 버튼
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    renderComments();
});
