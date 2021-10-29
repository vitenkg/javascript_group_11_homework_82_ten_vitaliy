const express = require('express');
const Track = require('../models/Track');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('get tracks');
  try {
    const query = {};

    if (req.query.album) {
      query.album = req.query.album;
    }

    console.log('query: ', query.album);

    const tracks = await Track.find(query).populate('album', 'name artist');
    console.log(tracks);
    res.send(tracks);
  } catch (e) {
    res.sendStatus(500);
  }

});

router.post('/', async (req, res) => {
  if (!req.body.name || !req.body.album) {
    return res.status(400).send('Data Not valid');
  }

  const trackData = {
    name: req.body.name,
    album: req.body.album,
    lasting: req.body.lasting || null
  }


  const track = new Track(trackData);
  try {
    await track.save();
    res.send(track);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;