const finalResponse = {};

const getFinalResponse = function() {
  return [].concat.apply([], Object.values(finalResponse));
};

const accumulateResponse = function(response) {
  const keys = Object.keys(response);

  for (const key of keys) {
    if (finalResponse[key] == null) {
      finalResponse[key] = [];
    }
    finalResponse[key] = [...finalResponse[key], response[key]];
  }
};

module.exports = {
  getFinalResponse,
  accumulateResponse
};
