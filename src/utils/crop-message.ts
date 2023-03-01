const cropMessage = (message: string) => {
  message = message.replace(/<br\/>/g, " ");
  if (message.length > message.slice(0, 80).length) {
    message = message.slice(0, 80);
    message += "...";
  } else message = message.slice(0, 80);
  return message;
};

export default cropMessage;
