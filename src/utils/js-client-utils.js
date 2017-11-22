//generic, client-side JS utilities that are OK for webpack to pack
//############# these are specific to profilic: do not add any other client utils here/
const JSClientUtils = {

  validateEmail : function(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
  }
};

module.exports = JSClientUtils;