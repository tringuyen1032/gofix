const express = require("express");
const admin = require("firebase-admin");
const app = express();
const port = 4000;
const serviceAccount = require("./prm-project-c1964-firebase-adminsdk-aqqhk-064ce5a382.json");

app.use(express.json())

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://gofix-mechanic-76e86-default-rtdb.firebaseio.com/"
});

var registrationTokenGoFix = "f-9XcKtbTsqOejBG7TJ_4w:APA91bFiIqUrieC6e9L2X1QdhYdL_nongyoY0Lzqo4cUjHrzO38j0wo22nU_eYaWElwh9nZso0JkTO2o4_uBXi-QKimyctDxWcm10VIrTivIg8z0kK5FF1VgYn4azPgSp4oHXbvgUybm";

app.post("/token", (req, res) => {
   registrationTokenGoFix = req.body.token;
   console.log(registrationTokenGoFix);
} )

app.get("/",  (req, res) => {
   console.log('wtf');
   var payload = {
      notification: {
         title: "Đã có thợ nhận đơn.",
         body: "Trần Đại Đen đã nhận yêu cầu của bạn. Vị trí cách bạn 5km."
      },
      data: {
         account: "Savings",
         balance: "$3020.25"
      }
   };

   var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
   };

   admin.messaging().sendToDevice(registrationTokenGoFix, payload, options)
      .then(function (response) {
         res.send(`Successfully sent message: ${response}`);
      })
      .catch(function (error) {
         res.send(`Error sending message: ${error}`);
      });
});

app.get("/done", async (req, res) => {
   var payload = {
      notification: {
         title: "Đã hoàn thành đơn.",
         body: "Trần Đại Đen đã hoàn thành sửa chữa."
      },
      data: {
         account: "Savings",
         balance: "$3020.25"
      }
   };

   var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
   };

   admin.messaging().sendToDevice(registrationTokenGoFix, payload, options)
      .then(function (response) {
         res.send(`Successfully sent message: ${response}`);
      })
      .catch(function (error) {
         res.send(`Error sending message: ${error}`);
      });
});

app.listen(port, () => {
   console.log(
      `Example app listening at http://localhost:${port}`
   );
});
