const Utils = {
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split('/');
    let request = {
      resource: null,
      id: null,
      type: null,
    };
    request.resource = r[1];
    request.type = r[2];
    request.id = r[3];

    return request;
  },

  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

export default Utils;
