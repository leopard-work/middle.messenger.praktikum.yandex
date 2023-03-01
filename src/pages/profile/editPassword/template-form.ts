export const templateForm = `
    {{backLink}}
    <h1 class="auth__title profile__title">{{ titleEditPassword }}</h1>
    <label class="auth__input-text-wrapper">
        {{oldPasswordBlock}}
    </label>
    <label class="auth__input-text-wrapper">
        {{newPasswordBlock}}
    </label>
    <label class="auth__input-text-wrapper">
        {{confirmPasswordBlock}}
    </label>
    <p class="auth_error"><span>{{error}}</span></p>
    <div class="auth__button-wrapper">
        {{buttonBlock}}
    </div>
`;
