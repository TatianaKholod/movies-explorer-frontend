import { useEffect } from 'react';

export default function useClose(isOpen, close) {
  useEffect(() => {
    if (!isOpen) return; // останавливаем действие эффекта, если попап закрыт

    const handleOverlay = (event) => {
      // если есть `header__nav_menu-opened` в классах блока, значит, кликнули на оверлей
      if (event.target.classList.contains('header__nav_menu-opened')) {
        close();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);

    //  обязательно удаляем обработчики в `clean-up`- функции
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOverlay);
    };
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, close]);
}
