export const setupSearchHighlight = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
          const searchText = selection.toString().toLowerCase();
          const charElements = document.querySelectorAll('.alignment-char-text[data-char]');
          
         
          charElements.forEach(el => el.classList.remove('highlight'));
          
          
          let currentMatch = '';
          let currentElements: Element[] = [];
          
          charElements.forEach((el) => {
            const char = el.getAttribute('data-char')?.toLowerCase() || '';
            if (searchText.includes(currentMatch + char)) {
              currentMatch += char;
              currentElements.push(el);
            } else {
              if (currentMatch === searchText) {
                currentElements.forEach(e => e.classList.add('highlight'));
              }
              currentMatch = char;
              currentElements = [el];
            }
          });
          
          
          if (currentMatch === searchText) {
            currentElements.forEach(e => e.classList.add('highlight'));
          }
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => observer.disconnect();
}; 