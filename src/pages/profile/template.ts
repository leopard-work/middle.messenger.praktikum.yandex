export const template = `
[[ temp_nav? ]]
<main class="auth-wrapper">
    <div class="auth profile">
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
            {{emailBlock}}
        </label>
        <label class="auth__input-text-wrapper">
            {{loginBlock}}
        </label>
        <label class="auth__input-text-wrapper">
            {{nameBlock}}
        </label>
        <label class="auth__input-text-wrapper">
            {{surnameBlock}}
        </label>
        <label class="auth__input-text-wrapper">
            {{chatNameBlock}}
        </label>
        <label class="auth__input-text-wrapper">
            {{phoneBlock}}
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
    </div>
</main>
`;
