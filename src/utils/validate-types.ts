const validateTypes = {
  empty: {
    pattern: /\S+/,
    message: "Поле не должно быть пустым",
  },
  name: {
    pattern: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
    message: "Без пробелов, спецсимволов и цифр, первая буква заглавная",
  },
  login: {
    pattern: /^(?=[a-zA-Z\d_-]{3,20}$)(?!\s)(?=.*[a-zA-Z]+).*$/,
    message: "От 3 до 20 символов, без пробелов и спецсимволов",
  },
  email: {
    pattern: /[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/,
    message: "E-mail должен быть корректным",
  },
  password: {
    pattern: /^(?=.{8,40}$)(?=.*[A-Z])(?=.*\d).*$/,
    message: "От 8 до 40 символов, обязательно заглавная буква и цифры",
  },
  phone: {
    pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    message: "Телефон должен быть корректным",
  },
};

export default validateTypes;
