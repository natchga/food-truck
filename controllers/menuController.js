const { getCollection, ObjectId } = require("../../config/db");
const MenuItem = require("../models/MenuItem");

exports.getAll = async () => {
    const col = await getCollection("food-truckAPI", "Menu");
    return col.find().toArray();
};

exports.getById = async (id) => {
    const col = await getCollection("food-truckAPI", "Menu");
    return col.findOne({ _id: new ObjectId(id) });
};

exports.add = async (data) => {
    const col = await getCollection("food-truckAPI", "Menu");
    const item = new MenuItem(data);
    return col.insertOne(item);
};
