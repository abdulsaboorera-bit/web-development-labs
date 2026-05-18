(function () {
  const wrapper = document.getElementById('shop-chatbot');
  const toggle = document.getElementById('shop-chatbot-toggle');
  const panel = document.getElementById('shop-chatbot-panel');
  const form = document.getElementById('shop-chatbot-form');
  const input = document.getElementById('shop-chatbot-text');
  const messages = document.getElementById('shop-chatbot-messages');

  if (!wrapper || !toggle || !panel || !form || !input || !messages) return;

  toggle.addEventListener('click', () => {
    const isOpen = wrapper.classList.contains('is-open');
    if (isOpen) {
      wrapper.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      wrapper.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      input.focus();
    }
  });

  const appendMessage = (text, role) => {
    const div = document.createElement('div');
    div.className = `shop-chatbot-message ${role}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        appendMessage('AI error. Please try again.', 'bot');
        return;
      }

      const data = await response.json();
      appendMessage(data.reply || 'AI error. Please try again.', 'bot');
    } catch (error) {
      appendMessage('AI error. Please try again.', 'bot');
    }
  });
})();
