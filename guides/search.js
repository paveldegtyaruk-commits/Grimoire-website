const search = document.querySelector('.guide-search');
const query = document.querySelector('#guide-query');
const status = document.querySelector('#guide-search-status');
const clearButton = document.querySelector('#guide-clear');
const tabs = document.querySelector('.guide-tabs');
const categories = [...document.querySelectorAll('.guide-category')];

function normalize(text) {
  return text.toLocaleLowerCase('ru').replaceAll('ё', 'е');
}

function filterGuides() {
  const tokens = normalize(query.value.trim()).split(/\s+/).filter(Boolean);
  let matches = 0;

  for (const category of categories) {
    let categoryMatches = 0;

    for (const card of category.querySelectorAll('[data-guide]')) {
      const text = normalize(card.textContent);
      const visible = tokens.every(token => text.includes(token));
      card.hidden = !visible;
      if (visible) categoryMatches += 1;
    }

    category.hidden = categoryMatches === 0;
    matches += categoryMatches;
  }

  const active = tokens.length > 0;
  clearButton.hidden = !active;
  tabs.hidden = active;
  status.textContent = active
    ? (matches ? `Найдено гайдов: ${matches}` : 'По этому запросу ничего не найдено. Попробуйте другое слово.')
    : '';
}

search.hidden = false;
query.addEventListener('input', filterGuides);
clearButton.addEventListener('click', () => {
  query.value = '';
  filterGuides();
  query.focus();
});
