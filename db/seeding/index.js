let appRoot           = require('app-root-path');
const mongoose        = require(appRoot + '/db/connection.js');
const mario           = require(appRoot + '/db/seeding/db/pic.js');
const Pic             = require(appRoot + '/db/models/picture.js');


async function seeding() {
    try {
        let isAnswer = await Pic.exists();
        if (isAnswer) {
            await Pic.collection.drop();
        }
        await Pic.create(mario);
        await mongoose.connection.close();
    }catch (err) {
       console.log(err)
    }
}

seeding().then(() => {console.log('seeding finished')});

