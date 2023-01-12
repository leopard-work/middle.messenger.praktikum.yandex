export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <form class="auth profile">
        [[ link? &href='/' &className='profile__back' &title='{{ back }}' ]]
        <h1 class="auth__title profile__title">{{ title }}</h1>
        <div class="profile__avatar">
            <span></span>
        </div>
        <div class="auth__link profile__edit-avatar">
            [[ link? &href='/profile' &title='{{ photo }}' ]]
            <input type="file" name="avatar" style="display: none">
        </div>
        <label class="auth__input-text-wrapper">
            [[ input? &name='email' &className='input-text auth__input-text profile__input-text' &placeholder='{{ email }}' &value='test@mail.ru' &disabled='true' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='login' &className='input-text auth__input-text profile__input-text' &placeholder='{{ login }}' &value='test' &disabled='true' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='first_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ name }}' &value='Василий' &disabled='true' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='second_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ surname }}' &disabled='true' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='display_name' &className='input-text auth__input-text profile__input-text' &placeholder='{{ chat_name }}' &disabled='true' ]]
        </label>
        <label class="auth__input-text-wrapper">
            [[ input? &name='phone' &className='input-text auth__input-text profile__input-text' &placeholder='{{ phone }}' &value='+79763653344' &disabled='true' ]]
        </label>
        <div class="auth__link profile__link">
            [[ link? &href='/profile/edit' &title='{{ edit }}' ]]
        </div>
        <div class="auth__link profile__link">
            [[ link? &href='/profile/password' &title='{{ edit_password }}' ]]
        </div>
        <div class="auth__link profile__link profile__sign-out">
            [[ link? &href='/' &title='{{ sign_out }}' ]]
        </div>
    </form>
</main>
`;
