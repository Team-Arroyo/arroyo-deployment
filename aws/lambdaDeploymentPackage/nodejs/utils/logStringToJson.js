const logStringToJson = (logString) => {
  const stringifiedLogs = logString.split("\n");
  //Split leaves a trailing '' at end of array. Must be poped before converting to JSON
  stringifiedLogs.pop();
  return stringifiedLogs.map(text => JSON.parse(text));
}

module.exports = logStringToJson
