export const template = `
    {{tempNav}}
    <main class="auth-wrapper">
        <div class="auth profile">
            {{backLink}}
            <h1 class="auth__title profile__title">{{ title }}</h1>
            <div class="profile__avatar">
                {{avatarBlock}}
            </div>
            <div class="auth__link profile__edit-avatar">
                {{loadPhotoLink}}
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
            <p class="auth_error"><span>{{error}}</span></p>
            <div class="auth__link profile__link">
                {{editLink}}
            </div>
            <div class="auth__link profile__link">
                {{editPasswordLink}}
            </div>
            <div class="auth__link profile__link profile__sign-out">
                {{signOutLink}}
            </div>
        </div>
        {{avatarInput}}
        {{avatarBlock}}
    </main>
`;
