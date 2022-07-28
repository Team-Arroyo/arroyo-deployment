const axios = require('axios');
const instance = axios.create({
  timeout: 1500
});

const postToLogstash = async(host, jsonArray) => {
  console.log("payload to ls", jsonArray);

  try {
    if(jsonArray.length < 1) {
      throw Error("No results found to ingest. Stopping ingestion.")
    }
    const { data } = await instance.post(`http://${host}`, jsonArray);
  } catch(err) {
    console.log("Error in logstash service", err);
    throw  err;
  }
}

module.exports = {
  postToLogstash
}