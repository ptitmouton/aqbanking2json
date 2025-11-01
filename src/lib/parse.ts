export const parse = (content: string, parent: Record<string, any> = {}) => {
  const matcher =
    /^\s*(?:(?<objType>\w*) {(?<objContent>.*?)} #\1)|((?<valueType>int|char)\s+(?<valueName>\w*)="(?<value>[^"]+)*)"$/gms;

  const matches = Array.from(content.matchAll(matcher)).map(
    ({ groups }) => groups,
  ) as Array<
    | { objType: string; objContent: string }
    | { valueType: string; valueName: string; value: string }
  >;

  matches.reduce((acc, matchedGroup) => {
    if ("objType" in matchedGroup && matchedGroup.objType) {
      const { objType: property, objContent: content } = matchedGroup;
      if (/^\w+List$/.test(property)) {
        const itemProperty = property.replace(/List$/, "");
        if (!Array.isArray(acc[itemProperty])) {
          acc[itemProperty] = [];
        }
        parse(content, acc[itemProperty]);
        return acc;
      } else if (Array.isArray(acc)) {
        const child = {};
        parse(content, child);
        acc.push(child);
        return acc;
      } else {
        acc[property] = {};
        parse(content, acc[property]);
      }
    } else if ("valueType" in matchedGroup && matchedGroup.valueType) {
      const { valueType: type, valueName: property, value } = matchedGroup;
      acc[property] = {};
      if (type === "int") {
        acc[property] = parseInt(value, 10);
      } else {
        acc[property] = value;
      }
    }
    return acc;
  }, parent);

  return parent;
};
