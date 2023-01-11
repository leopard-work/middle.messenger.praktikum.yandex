export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth">
        <h1 class="auth__title">{{ title }}</h1>
        <p class="auth__error">{{ error }}</p>
        <p class="auth__text">{{ login }}</p>
        [[ input? &name='login' &className='input-text auth__input-text' ]]
        <div class="auth__text">{{ password }}</div>
        [[ input? &name='password' &type='password' &className='input-text auth__input-text' ]]
        <button type="submit" class="input-button auth__button">{{ button }}</button>
        <div class="auth__link">
            [[ link? &href='#sign-up' &title='{{ reg_link }}' ]]
        </div>
    </form>
</main>
`;
