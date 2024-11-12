document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const backButton = document.getElementById('back-button');

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // 글 작성
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const author = document.getElementById('post-author').value;
        const date = new Date().toISOString().split('T')[0];

        if (title && content && author) {
            const id = posts.length;
            posts.push({ id, title, content, author, date });
            localStorage.setItem('posts', JSON.stringify(posts));
            alert('글이 작성되었습니다!');
            window.location.href = 'index.html';
        } else {
            alert('모든 필드를 입력해주세요!');
        }
    });

    // 목록 페이지로 돌아가기
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
