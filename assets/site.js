'use strict';

// Directory URLs work on GitHub Pages; also tidy explicitly bookmarked index files.
if (location.pathname.endsWith('/index.html')) {
  history.replaceState(null, '', location.pathname.slice(0, -10) + location.search + location.hash);
}

const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-category]')];
const resultCount = document.querySelector('[data-result-count]');

for (const button of filters) {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    for (const filter of filters) filter.setAttribute('aria-pressed', String(filter === button));
    let visible = 0;
    for (const project of projects) {
      project.hidden = category !== 'all' && project.dataset.category !== category;
      if (!project.hidden) visible += 1;
    }
    if (resultCount) resultCount.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
  });
}

for (const year of document.querySelectorAll('[data-current-year]')) {
  year.textContent = new Date().getFullYear();
}
