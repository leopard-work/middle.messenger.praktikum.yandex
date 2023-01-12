export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth">
        <h1 class="auth__title">Регистрация</h1>
        <p class="auth__text"></p>
        <label class="auth__input-text-wrapper">
            [[ input? &name='email' &className='input-text auth__input-text' &placeholder='{{ email }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='login' &className='input-text auth__input-text' &placeholder='{{ login }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='first_name' &className='input-text auth__input-text' &placeholder='{{ name }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='second_name' &className='input-text auth__input-text' &placeholder='{{ surname }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='phone' &className='input-text auth__input-text' &placeholder='{{ phone }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='password' &type='password' &className='input-text auth__input-text' &placeholder='{{ password }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='password_confirm' &type='password' &className='input-text auth__input-text' &placeholder='{{ password_confirm }}' ]]
        </label>
        <div class="auth__button-wrapper">
            <button type="submit" class="input-button auth__button">{{ button }}</button>
        </div>
        <div class="auth__link">
            [[ link? &href='/sign-in' &title='{{ login_link }}' ]]
        </div>
    </form>
</main>
`;
