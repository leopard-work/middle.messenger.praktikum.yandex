export const editPasswordTemplate = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth profile">
        [[ link? &href='/profile' &className='profile__back' &title='{{ back }}' ]]
        <h1 class="auth__title profile__title">{{ titleEditPassword }}</h1>
        <label class="auth__input-text-wrapper">
            [[ input? &name='oldPassword' &type='password' &className='input-text auth__input-text profile__input-text' &placeholder='{{ oldPassword }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='newPassword' &type='password' &className='input-text auth__input-text profile__input-text' &placeholder='{{ newPassword }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='newPassword_confirm' &type='password' &className='input-text auth__input-text profile__input-text' &placeholder='{{ confirmPassword }}' ]]
        </label>
        <div class="auth__button-wrapper">
            <button type="submit" class="input-button auth__button profile__button">{{ passwordBtn }}</button>
        </div>
    </form>
</main>
`;
