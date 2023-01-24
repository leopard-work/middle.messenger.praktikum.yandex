export const templateForm = `
    [[ link? &href='/profile' &className='profile__back' &title='{{ back }}' ]]
    <h1 class="auth__title profile__title">{{ titleEdit }}</h1>
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
    <div class="auth__button-wrapper">
        {{buttonBlock}}
    </div>
`;
