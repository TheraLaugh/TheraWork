// إضافة صف جداول جديد (تمدد أفقي)
function addTableRow() {
  const tableGrid = document.getElementById('tableGrid');
  const firstRow = tableGrid.querySelector('.table-row');
  const columnCount = firstRow ? firstRow.children.length : 1;

  const newRow = document.createElement('div');
  newRow.className = 'table-row';

  for (let i = 0; i < columnCount; i++) {
    const tableBlock = document.createElement('div');
    tableBlock.className = 'table-block';

    const table = document.createElement('table');
    table.className = 'data-table';

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    headRow.innerHTML = `<th contenteditable="true"></th><th contenteditable="true"></th>`;
    thead.appendChild(headRow);

    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');
    dataRow.innerHTML = `<td contenteditable="true"></td><td contenteditable="true"></td>`;
    tbody.appendChild(dataRow);

    table.appendChild(thead);
    table.appendChild(tbody);
    tableBlock.appendChild(table);
    newRow.appendChild(tableBlock);
  }

  tableGrid.appendChild(newRow);
}

// إضافة صف بيانات جديد داخل كل جدول (تمدد عمودي)
function addRowToAllTables() {
  const tables = document.querySelectorAll('.data-table');
  tables.forEach(table => {
    const row = document.createElement('tr');
    row.innerHTML = `<td contenteditable="true"></td><td contenteditable="true"></td>`;
    table.querySelector('tbody').appendChild(row);
  });
}

// البحث الذكي
document.getElementById('searchInput').addEventListener('input', () => {
  const query = document.getElementById('searchInput').value.trim();
  const rows = document.querySelectorAll('.data-table tbody tr');

  rows.forEach(row => {
    const cells = Array.from(row.children);
    const match = cells.some(cell => cell.textContent.includes(query));
    row.style.display = match || query === '' ? '' : 'none';
  });
});

document.getElementById('clearSearch').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchInput').dispatchEvent(new Event('input'));
});

// كشف التشابهات
function checkSimilarity() {
  const allCells = Array.from(document.querySelectorAll('.data-table td'));
  const values = allCells.map(cell => cell.textContent.trim());

  allCells.forEach(cell => {
    const value = cell.textContent.trim();
    cell.classList.remove('match-exact', 'match-close');

    values.forEach(other => {
      if (value && other && value !== other) {
        if (value === other) {
          cell.classList.add('match-exact');
        } else if (isTimeSimilar(value, other)) {
          cell.classList.add('match-close');
        }
      }
    });
  });
}

// مقارنة التوقيتات
function isTimeSimilar(a, b) {
  const timeRegex = /(\d{1,2})([:٫،]?\d{0,2})?\s*[-–إلى]\s*(\d{1,2})([:٫،]?\d{0,2})?/;
  const matchA = a.match(timeRegex);
  const matchB = b.match(timeRegex);

  if (!matchA || !matchB) return false;

  const startA = parseFloat(matchA[1]) + (parseFloat(matchA[2].replace(/[:٫،]/, '')) || 0) / 60;
  const endA = parseFloat(matchA[3]) + (parseFloat(matchA[4]?.replace(/[:٫،]/, '')) || 0) / 60;
  const startB = parseFloat(matchB[1]) + (parseFloat(matchB[2].replace(/[:٫،]/, '')) || 0) / 60;
  const endB = parseFloat(matchB[3]) + (parseFloat(matchB[4]?.replace(/[:٫،]/, '')) || 0) / 60;

  return Math.abs(startA - startB) <= 1 || Math.abs(endA - endB) <= 1;
}

// تشغيل الكشف عند أي تغيير
document.addEventListener('input', () => {
  checkSimilarity();
});

// تصدير إلى Excel
document.getElementById('exportExcel').addEventListener('click', () => {
  alert('📤 سيتم دعم التصدير إلى Excel في الخطوة التالية باستخدام مكتبة SheetJS.');
});