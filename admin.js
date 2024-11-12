document.addEventListener('DOMContentLoaded', () => {
    const adminPostList = document.getElementById('admin-post-list');
    const adminCommentList = document.getElementById('admin-comment-list');
    const backButton = document.getElementById('back-button');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // 게시글 목록 렌더링
    const renderPosts = () => {
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

        // 게시글 삭제
        document.querySelectorAll('.delete-post-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = e.target.dataset.id;
                deletePost(postId);
            });
        });
    };

    // 댓글 관리 렌더링
    const renderComments = () => {
        adminCommentList.innerHTML = '';
        posts.forEach(post => {
            (post.comments || []).forEach((comment, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="comment-content">${comment.text}</div>
                    <div class="comment-meta">${comment.author || '익명'} | ${comment.date}</div>
                    <button class="comment-delete-button" data-post-id="${post.id}" data-index="${index}">삭제</button>
                `;
                adminCommentList.appendChild(li);
            });
        });

        // 댓글 삭제
        document.querySelectorAll('.comment-delete-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = e.target.dataset.postId;
                const commentIndex = e.target.dataset.index;
                deleteComment(postId, commentIndex);
            });
        });
    };

    // 게시글 삭제 함수
    const deletePost = (postId) => {
        const postIndex = posts.findIndex(post => post.id == postId);
        if (postIndex !== -1) {
            if (confirm('이 글을 삭제하시겠습니까?')) {
                posts.splice(postIndex, 1);
                localStorage.setItem('posts', JSON.stringify(posts));
                alert('글이 삭제되었습니다.');
                renderPosts();
                renderComments();
            }
        }
    };

    // 댓글 삭제 함수
    const deleteComment = (postId, commentIndex) => {
        const post = posts.find(post => post.id == postId);
        if (post && post.comments) {
            post.comments.splice(commentIndex, 1);
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('댓글이 삭제되었습니다.');
            renderComments();
        }
    };

    // 목록 페이지로 돌아가기
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    renderPosts();
    renderComments();
});
