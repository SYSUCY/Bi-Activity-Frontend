const OSS = require('ali-oss');

const client = new OSS({
  endpoint: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: ''
});

export default client;