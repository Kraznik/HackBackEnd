var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");

router.post(
  "/getLazyMintSignature/:category",
  auth,
  require("../controllers/getLazyMintSignature")
);

router.post(
  "/mintMoments/:category",
  auth,
  require("../controllers/mintMoments")
);

router.post("/ethMoments", auth, require("../controllers/ethMoments.js"));

router.get("/getAddress/:address", auth, require("../controllers/getAddress"))

router.get(
  "/ethMomentsLeaderboard",
  auth,
  require("../controllers/ethMomentsLeaderboard.js")
);

router.get("/getAccessToken", require("../controllers/apiAuth"));

module.exports = router;
