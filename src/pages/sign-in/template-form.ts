export const form_template = `
    <h1 class="auth__title">{{ title }} {{request}}</h1>
    <label class="auth__input-text-wrapper">
        {{loginBlock}}
    </label>
    <label class="auth__input-text-wrapper">
        {{passwordBlock}}
    </label>
    <div class="auth__button-wrapper">
        {{buttonBlock}}
    </div>
    <div class="auth__link">
        {{signUpLink}}
    </div>
`;
