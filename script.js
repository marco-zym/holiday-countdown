const form = document.getElementById('festivalForm');
const countdownList = document.getElementById('countdownList');
// 从LocalStorage加载节日
function loadFestivals() {
    const festivals = JSON.parse(localStorage.getItem('festivals')) || [];
    countdownList.innerHTML = '';
    festivals.forEach((festival, index) => {
        addFestivalToDOM(festival, index);
    });
}
// 将节日添加到DOM
function addFestivalToDOM(festival, index) {
    const festivalDiv = document.createElement('div');
    festivalDiv.className = 'countdown';
    const today = new Date();
    const targetDate = new Date(festival.date);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    festivalDiv.innerHTML = `
        距离 <strong>${festival.name}</strong> 还有 <strong>${diffDays}</strong> 天
        <button onclick="deleteFestival(${index})">删除</button>
    `;
    countdownList.appendChild(festivalDiv);
}
// 添加节日
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('festivalName').value;
    const date = document.getElementById('festivalDate').value;
    if (!name || !date) {
        alert('请填写完整的节日名称和日期！');
        return;
    }
    const festivals = JSON.parse(localStorage.getItem('festivals')) || [];
    festivals.push({ name, date });
    localStorage.setItem('festivals', JSON.stringify(festivals));
    form.reset();
    loadFestivals();
});
// 删除节日
function deleteFestival(index) {
    const festivals = JSON.parse(localStorage.getItem('festivals')) || [];
    festivals.splice(index, 1);
    localStorage.setItem('festivals', JSON.stringify(festivals));
    loadFestivals();
}
// 页面加载时初始化
window.onload = loadFestivals;