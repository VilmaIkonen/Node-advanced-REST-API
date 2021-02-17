const sql = require('./sqlStatements.json');

for(let key of Object.keys(sql)) {
  console.log(sql[key].join(' '));
}