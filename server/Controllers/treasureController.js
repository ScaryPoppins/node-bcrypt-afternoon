const express = require("express");
const app = express();

const dragonTreasure = async (req, res) => {
  const response = await req.app
    .get("db")
    .get_dragon_treasure(1)
    .catch(error => {
      console.log(error);
      res.status(500).json("Server Error");
    });
  res.status(200).json(response);
};

const getUserTreasure = async (req, res) => {
  const reply = await req.app.get("db").get_user_treasure(req.session.user.id);
  res.status(200).json(reply);
};

const addUserTreasure = async (req, res) => {
  const { treasureURL } = req.body;
  const { id } = req.session.user;
  const userTreasure = await req.app
    .get("db")
    .add_user_treasure([treasureURL, id])
    .catch(error => console.log(error));
  res.status(200).json(userTreasure);
};

const getAllTreasure = async (req, res) => {
  const reply = await req.app
    .get("db")
    .get_all_treasure()
    .catch(error => console.log(error));
  res.status(200).json(reply);
};

module.exports = {
  dragonTreasure,
  getUserTreasure,
  addUserTreasure,
  getAllTreasure
};






// also works... but not MY code.   



// async function dragonTreasure(req,res) {
//   const db = req.app.get('db')
//   const treasure = await db.get_dragon_treasure(1);
//   return res.status(200).send(treasure);
// }

// async function getUserTreasure(req,res) {
//   const db = req.app.get('db')
//   const userTreasure = await db.get_user_treasure([req.session.user.id]);
//   return res.status(200).send(userTreasure);
// }

// async function addUserTreasure(req,res) {
//   const db = req.app.get('db')
//   const { treasureURL } = req.body;
//   const { id } = req.session.user;
//   const userTreasure = await db.add_user_treasure([treasureURL, id]);
//   return res.status(200).send(userTreasure);
// }

// async function getAllTreasure(req,res) {
//   const db = req.app.get('db')
//   const allTreasure = await db.get_all_treasure();
//   return res.status(200).send(allTreasure)
// }


// module.exports = {
//   dragonTreasure,
//   getUserTreasure,
//   addUserTreasure,
//   getAllTreasure
// }