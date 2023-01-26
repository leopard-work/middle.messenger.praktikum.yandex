export const form_template = `
    <h1 class="auth__title">{{title}}</h1>
    <p class="auth__text"></p>
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
        {{phoneBlock}}
    </label>
    <label class="auth__input-text-wrapper">
        {{passwordBlock}}
    </label>
    <label class="auth__input-text-wrapper">
        {{passwordConfirmBlock}}
    </label>
    <div class="auth__button-wrapper">
        {{buttonBlock}}
    </div>
    <div class="auth__link">
        {{signInLink}}
    </div>
`;
