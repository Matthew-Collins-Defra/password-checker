const checkPwnd = require('./services/checkPwnd')

const onDone = x => {
  console.log(x)
  process.exit(0)
}

const args = process.argv.slice(2)
let password = 'password'
if (args.length > 0) {
  password = args[0]
}

checkPwnd(password).then(onDone)

setTimeout(x => console.log('timeout)'), 10000)
