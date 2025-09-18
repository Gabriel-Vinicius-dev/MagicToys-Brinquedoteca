// Lógica para os botões "Ver mais"
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section .card.hidden').forEach(card => {
        card.classList.add('toggleable');
    });

    document.querySelectorAll('.showmore').forEach(button => {
        button.setAttribute('aria-expanded', 'false');

        button.addEventListener('click', () => {
            const container = button.closest('.vermais')?.previousElementSibling;
            if (!container) return;

            let toggleCards = container.querySelectorAll('.card.toggleable');

            if (toggleCards.length === 0) {
                container.querySelectorAll('.produtos .card.hidden').forEach(card => {
                    card.classList.add('toggleable');
                });
                toggleCards = container.querySelectorAll('.card.toggleable');
            }

            if (toggleCards.length === 0) {
                container.querySelectorAll('.produtos .card:nth-child(n+5)').forEach(card => {
                    if (card.classList.contains('hidden')) {
                        card.classList.add('toggleable');
                    }
                });
                toggleCards = container.querySelectorAll('.card.toggleable');
            }

            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            toggleCards.forEach(card => {
                card.classList.toggle('hidden', isExpanded);
            });

            button.textContent = isExpanded ? 'Ver mais' : 'Ver menos';
            button.setAttribute('aria-expanded', !isExpanded);
        });
    });
});