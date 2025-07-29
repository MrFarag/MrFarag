// تكوين الكتاب
const totalPages = 10;
let currentPage = 1;
let currentZoom = 1;

// عناصر واجهة المستخدم
const bookImage = document.getElementById('bookImage');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetZoomBtn = document.getElementById('resetZoom');
const originalSizeBtn = document.getElementById('originalSize');
const pageIndicator = document.querySelector('.page-indicator');

// تحديث صفحة الكتاب
function updatePage() {
  const pageNum = currentPage.toString().padStart(3, '0');
  bookImage.src = `Emt7an-Rev/${pageNum}.jpg`;
  pageIndicator.textContent = `الصفحة ${currentPage} من ${totalPages}`;
  resetZoom();
}

// التنقل بين الصفحات
function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
}

function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updatePage();
  }
}

// التحكم في التكبير/التصغير
function zoomIn() {
  if (currentZoom < 3) {
    currentZoom += 0.1;
    applyZoom();
  }
}

function zoomOut() {
  if (currentZoom > 0.5) {
    currentZoom -= 0.1;
    applyZoom();
  }
}

function resetZoom() {
  currentZoom = 1;
  applyZoom();
}

function showOriginalSize() {
  bookImage.style.width = 'auto';
  bookImage.style.height = 'auto';
  bookImage.style.transform = 'none';
  bookImage.parentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

function applyZoom() {
  bookImage.style.transform = `scale(${currentZoom})`;
}

// تهيئة الأحداث
function initBookViewer() {
  updatePage();
  
  prevPageBtn.addEventListener('click', goToPrevPage);
  nextPageBtn.addEventListener('click', goToNextPage);
  zoomInBtn.addEventListener('click', zoomIn);
  zoomOutBtn.addEventListener('click', zoomOut);
  resetZoomBtn.addEventListener('click', resetZoom);
  originalSizeBtn.addEventListener('click', showOriginalSize);
  
  // التنقل بلوحة المفاتيح
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToNextPage();
    if (e.key === 'ArrowLeft') goToPrevPage();
    if (e.key === '+') zoomIn();
    if (e.key === '-') zoomOut();
    if (e.key === '0') resetZoom();
  });
}

// بدء التشغيل عند تحميل الصفحة
window.addEventListener('load', initBookViewer);