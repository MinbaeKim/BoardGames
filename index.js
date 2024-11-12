document.addEventListener('DOMContentLoaded', () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postList = document.getElementById('post-list');
    const createButton = document.getElementById('create-button');

    // 글 목록 렌더링
    const renderPosts = () => {
        postList.innerHTML = '';
        posts.slice().reverse().forEach((post, index) => { // 최신 글이 위로 가도록 reverse()
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

    // 글 작성 페이지로 이동
    createButton.addEventListener('click', () => {
        window.location.href = 'create.html';
    });

    renderPosts();
});
