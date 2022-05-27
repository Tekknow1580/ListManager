import express from "express";
import bodyParser from 'body-parser';
import * as UC from './Models/UserControls.js';
import * as LC from './Models/ListControls.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/static', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(4000, () => {
    console.log("We are listening on port 4000");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Views/Login.html'))
})

app.get('/Main', (req, res) => {
    res.sendFile(path.join(__dirname, '/Views/Main.html'))
})

app.post('/Login/Del', (req, res) => {
    var User = req.body.UName;
    var Deleted = UC.Del(User);
    if (Deleted != true) {
        res.send(JSON.stringify({ res: 'Could Not Delete Account : ' + Deleted }));
        return;
    }
    Deleted = LC.Del(User);
    if (Deleted != true) {
        res.send(JSON.stringify({ res: true/*'Could Not Delete Account List: ' + Deleted*/ }));
        return;
    }
    res.send(JSON.stringify({ res: true }));
})

app.post('/Login/SignUp', (req, res) => {
    var User = req.body;
    try {
        if (User.UName == undefined)
            throw 'No Data Resived (S01)';
        if (User.Pass == undefined)
            throw 'No Data Resived (S02)';
    } catch (e) { res.send(JSON.stringify({ res: e })); return; }
    res.send(JSON.stringify({ res: UC.SignUp(User.UName, User.Pass) }));
})

app.post('/Login', (req, res) => {
    var User = req.body;
    try {
        if (User.UName == undefined)
            throw 'No Data Resived (L01)';
        if (User.Pass == undefined)
            throw 'No Data Resived (L02)';
    } catch (e) { res.send(JSON.stringify({ res: e })); return; }
    res.send(JSON.stringify({ res: UC.LogIn(User.UName, User.Pass) }));
});

app.post('/Main/List', (req, res) => {
    res.send(LC.FullList(req.body.UName));
});

app.post('/Main/List/Lenght', (req, res) => {
    res.send(LC.Length(req.body.UName));
});

app.post('/Main/List/Add', (req, res) => {
    res.send(LC.Add(req.body.UName, req.body.Value, req.body.CDate));
});

app.post('/Main/List/RemoveAt', (req, res) => {
    res.send(LC.RemoveAt(req.body.UName, req.body.Value));
});

app.post('/Main/List/RemoveAll', (req, res) => {
    res.send(LC.RemoveAll(req.body.UName));
});