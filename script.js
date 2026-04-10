
const body = document.body;
const refs = document.getElementById('references');

document.querySelectorAll('[data-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.toggle;

    if (target === 'references') {
      const isHidden = refs.hasAttribute('hidden');
      if (isHidden) {
        refs.removeAttribute('hidden');
        button.classList.add('is-active');
      } else {
        refs.setAttribute('hidden', 'hidden');
        button.classList.remove('is-active');
      }
      return;
    }

    const className = `hide-${target}`;
    body.classList.toggle(className);
    button.classList.toggle('is-active', !body.classList.contains(className));
  });
});
