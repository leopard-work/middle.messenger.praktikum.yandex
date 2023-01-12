export const editTemplate = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth profile">
        [[ link? &href='/profile' &className='profile__back' &title='{{ back }}' ]]
        <h1 class="auth__title profile__title">{{ titleEdit }}</h1>
        <label class="auth__input-text-wrapper">
            [[ input? &name='email' &className='input-text auth__input-text profile__input-text' &placeholder='{{ email }}' &value='test@mail.ru' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='login' &className='input-text auth__input-text profile__input-text' &placeholder='{{ login }}' &value='test' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='first_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ name }}' &value='Василий' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='second_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ surname }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='display_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ chat_name }}' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='phone' &className='input-text auth__input-text profile__input-text' &placeholder='{{ phone }}' &value='+79763653344' ]]
        </label>
        <div class="auth__button-wrapper">
            <button type="submit" class="input-button auth__button profile__button">{{ edit }}</button>
        </div>
    </form>
</main>
`;
