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
    pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
    message: "От 3 до 20 символов, без пробелов и спецсимволов",
  },
  email: {
    pattern: /.+@[^@]+[a-z]+\\.[^@]{2,}$/,
    message: "E-mail должен быть корректным",
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$/,
    message: "От 8 до 40 символов, обязательно заглавная буква и цифры",
  },
  phone: {
    pattern: /^[+-d]?\\d{10,15}$/,
    message: "Телефон должен быть корректным",
  },
};

export default validateTypes;
