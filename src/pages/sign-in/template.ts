export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth">
        <h1 class="auth__title">{{ title }}</h1>
        <label class="auth__input-text-wrapper">
            [[ input? &name='login' &className='input-text auth__input-text' &placeholder='{{ login }}' ]]
            <p class="auth_error">Не заполнено поле</p>
        </label>
        <label>
            [[ input? &name='password' &type='password' &className='input-text auth__input-text' &placeholder='{{ password }}' ]]
        </label>
        <div class="auth__button-wrapper">
            <button type="submit" class="input-button auth__button">{{ button }}</button>
        </div>
        <div class="auth__link">
            [[ link? &href='/sign-up' &title='{{ reg_link }}' ]]
        </div>
    </form>
</main>
`;
