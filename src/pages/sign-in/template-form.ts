export const form_template = `
    <h1 class="auth__title">{{ title }}</h1>
    <label class="auth__input-text-wrapper">
        {{loginBlock}}
    </label>
    <label class="auth__input-text-wrapper">
        {{passwordBlock}}
    </label>
    <p class="auth_error"><span>{{error}}</span></p>
    <div class="auth__button-wrapper">
        {{buttonBlock}}
    </div>
    <div class="auth__link">
        {{signUpLink}}
    </div>
`;
