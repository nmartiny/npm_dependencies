var express = require('express');
const router = express.Router({mergeParams: true})
const {getAllDependencies} = require('../../../allDeps')

router.post('/allDependencies', function(req, res, next) {
  const allDeps = getAllDependencies()
  res.json(
    allDeps
  );
});

module.exports = router;
