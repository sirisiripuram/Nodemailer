const fs=require('fs')
const hbs = require('hbs');
const path = require('path');
const { param } = require('../routes/EValidationRoute');
class Util{
     template(data) {
        let filePath = path.join(__dirname, '../views', 'email.hbs');
        let source = fs.readFileSync(filePath, 'utf-8');
        let compiledTemplate = hbs.compile(source);
        return compiledTemplate(data);
    }
}
module.exports = {Util}