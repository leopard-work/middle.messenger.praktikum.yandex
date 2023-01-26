const parseTemplate = (template: string, values: { [key: string]: string }) => {
  const tplRegularVariable = /\{\{(.*?)\}\}/g;

  let match = null;
  let result = template;

  while ((match = tplRegularVariable.exec(template))) {
    const variableName = match[1].trim();
    if (!variableName) {
      continue;
    }
    const data = values[variableName];
    result = result.replace(match[0], data);
  }

  return result;
};

export default parseTemplate;
