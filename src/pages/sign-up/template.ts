export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth">
        <h1 class="auth__title">Регистрация</h1>
        <p class="auth__error">{{ error }}</p>
        <p class="auth__text">{{ email }}</p>
        [[ input? &name='email' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ login }}</div>
        [[ input? &name='login' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ name }}</div>
        [[ input? &name='first_name' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ surname }}</div>
        [[ input? &name='second_name' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ phone }}</div>
        [[ input? &name='phone' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ password }}</div>
        [[ input? &name='password' &type='password' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ password_confirm }}</div>
        [[ input? &name='password_confirm' &type='password' &className='input-text auth__input-text' ]]
        <button type="submit" class="input-button auth__button">{{ button }}</button>
        <div class="auth__link">
            [[ link? &href='/sign-in' &title='{{ login_link }}' ]]
        </div>
    </form>
</main>
`;
