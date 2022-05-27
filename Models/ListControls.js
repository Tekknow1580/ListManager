import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DataFolder = path.join(__dirname.substring(0, __dirname.length - 6), '/Data');

function ReadFile(File) {
    var List = fs.readFileSync(File);
    return JSON.parse(List);
}

function WriteFile(File, List) {
    fs.writeFileSync(File, JSON.stringify(List));
}

export function Del(ListName) {
    var Test = ListTest(ListName, false)
    if (Test)
        fs.unlinkSync(path.join(DataFolder, ListName + '.json'));
    else
        return 'LC01';
    return true;
}

export function FullList(ListName) {
    if (ListName == '')
        return false;
    ListTest(ListName, true);
    return ReadFile(path.join(DataFolder, ListName + '.json'));
}

export function Length(ListName) {
    return ReadFile(path.join(DataFolder, ListName + '.json')).length;
}

export function ListTest(ListName, CreateNew = false) {
    var File = path.join(DataFolder, ListName + '.json');
    var Exists = fs.existsSync(File);
    if (Exists)
        return true;
    if (CreateNew) {
        WriteFile(File, [])
        return true;
    }
    else
        return false;
}

export function Add(ListName, Item, Date) {
    var File = path.join(DataFolder, ListName + '.json');
    var List = ReadFile(File);
    List.push({ Value: Item, CDate: Date });
    WriteFile(File, List);
    return List;
}

export function RemoveAt(ListName, Index) {
    var File = path.join(DataFolder, ListName + '.json');
    var List = ReadFile(File);
    List.splice(Index, 1);
    WriteFile(File, List);
    return List;
}

export function RemoveAll(ListName) {
    var File = path.join(DataFolder, ListName + '.json');
    WriteFile(File, []);
    return [];
}