const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://superuser:superuser123@52.169.50.38:27017/devices?authSource=admin';
const dbName = 'devices';

const client = new MongoClient(url, {useUnifiedTopology: true});

/*MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db("tietokanta");

    client.close();
});*/

module.exports = {
    fetchDevices(req, res) {
        (async function () {
            try {
                await client.connect();
                console.log("Connected to server(fetchDevices)");
                const db = client.db(dbName);

                await db.collection('devicedata').find().toArray((err, results) => {
                    console.log(results);
                    res.send(results);
                });
            } catch (e) {
                console.log(e.stack);
            }
        })();
    },
    insertDevice(req, res) {
        (async function () {
            try {
                await client.connect();
                console.log("Connected to server(insertDevice)" + JSON.stringify(req.body));
                const db = client.db(dbName);

                await db.collection('devicedata').updateOne(
                    {deviceName: req.body.devName},
                    {
                        $set: {deviceName: req.body.devName, x: req.body.posX, y: req.body.posY}
                    },
                    {upsert: true},
                    (err, results) => {
                        if (err) return console.log(err);
                    }
                );
            } catch (e) {
                console.log(e.stack);
            }
        })();
    },
    deleteDevice(req, res) {
        (async function () {
            try {
                await client.connect();
                console.log(("Connected to server(deleteDevice)" + JSON.stringify(req.body)));
                const db = client.db(dbName);

                await db.collection('devicedata').deleteOne(
                    {deviceName: req.body.devName},
                    {},
                    (err, results) => {
                        if (err) return console.log(err);
                    }
                );
            } catch (e) {
                console.log(e.stack);
            }
        })();
    }
};