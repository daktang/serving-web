// 메인 엔트리 포인트
console.log('Hello from local frontend!');

// 여기에 앱 초기화 코드를 작성하세요
document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    if (root) {
        root.innerHTML = '<h1>로컬 프론트엔드 환경이 준비되었습니다!</h1>';
    }
});