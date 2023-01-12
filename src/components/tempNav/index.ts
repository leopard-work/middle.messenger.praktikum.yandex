export const tempNav = () => {
  return `
        <div class="temp-nav">
            <div class="temp-nav__title">Временная навигация (закрыть)</div>
            <nav class="temp-nav__items">
                <ul>
                    <li><a href="/" rel="link">Страница чатов</a></li>
                    <li><a href="/sign-in" rel="link">Авторизация</a></li>
                    <li><a href="/sign-up" rel="link">Регистрация</a></li>
                    <li><a href="/page404" rel="link">Ошибка 404</a></li>
                    <li><a href="/page500" rel="link">Ошибка 500</a></li>
                    <li><a href="/profile" rel="link">Профиль</a></li>
                    <li><a href="/profile/edit" rel="link">Изменить данные</a></li>
                    <li><a href="/profile/password" rel="link">Изменить пароль</a></li>
                </ul>
            </nav>
        </div>
    `;
};
