const path = require('path');
const hbs = require('hbs');
const fs=require('fs')
function template(data) {
    let filePath = path.join(__dirname, './views', 'email.hbs');
    let source = fs.readFileSync(filePath, 'utf-8');
    let compiledTemplate = hbs.compile(source);
    return compiledTemplate(data);
}
let user={
    userName:"santhosh"
}
console.log(template(user));