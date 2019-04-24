var express = require('express');
const router = express.Router({mergeParams: true})
const {getAllDependencies} = require('../../../allDeps')

router.get('/allDependencies', function(req, res, next) {
  const allDeps = getAllDependencies()
  res.send(
    allDeps
  );
});

module.exports = router;
