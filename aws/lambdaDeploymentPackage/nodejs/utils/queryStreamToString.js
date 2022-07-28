const queryStreamToString = async(generator) => {
  const chunks = [];
  for await (const value of generator) {
    if (value.Records) {
      chunks.push(value.Records.Payload);
    }
  }  
  const payload = Buffer.concat(chunks).toString('utf8');
  return payload;
}

module.exports = queryStreamToString;