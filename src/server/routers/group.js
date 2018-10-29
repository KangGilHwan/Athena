const express = require('express')
const group = require('../db/group')()
const board = require('../db/board')()

const router = express.Router();

router.post('', function(req, res) {
  console.log(`group : ${req.body}`);
  group.make(req.body, function(err, result) {
    group.show(result.insertId, function(showErr, data) {
      res.status(201).json(data[0]);
    })
  });
})

router.get('', function(req, res) {
  group.findAll(function(err, result) {
    res.status(200).json({ groups: result });
  });
})

router.post('/:groupId/boards', function(req, res) {
  console.log(`board : ${req.body}`);
  console.log(req.params.groupId);
  if (Object.keys(req.files).length === 0) {
    console.log('NO File');
    board.write(req.body, req.params.groupId, function(err, result) {
      board.show(result.insertId, function(showErr, data) {
        res.status(201).json(data[0]);
      })
    });
  }
  console.log(req.files.sampleFile.name);
  console.log(__dirname);
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`${__dirname}/../upload/${sampleFile.name}`, function(err) {
    if (err){
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
})

router.get('/:groupId/boards', function(req, res) {
  console.log(req.params.groupId);
  board.findByGroupId(req.params.groupId, function(err, data) {
  res.status(200).json({ boards: data });
  })
})

module.exports = router;
