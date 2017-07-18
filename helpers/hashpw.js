const crypto = require('crypto');
const hash = crypto.createHash('sha256');

function hashPass (input) {
  let result;
  hash.on('readable', () => {
    const data = hash.read();

    if (data) {
      result = data.toString('hex')
    }

      // Prints:
      //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
  });

  hash.write(input);
  hash.end();

  return result
}



module.exports = hashPass
