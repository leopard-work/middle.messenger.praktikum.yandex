export const template = `
[[ temp_nav? ]]
<main class="page-error">
    <h1 class="page-error__title">{{ title }}</h1>
    <p class="page-error__text">{{ text }}</p>
    <div class="page-error__link">
        [[ link? &href='/' &title='{{ link }}' ]]
    </div>
</main>
`;
