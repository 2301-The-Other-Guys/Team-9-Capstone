const router = require("express").Router();
const {
  models: { User },
} = require("../db");

// o: this will work but let's talk about the downsides

// POST /api/users/upload-image - Endpoint to handle image uploads
router.post("/upload-image", (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // Get the uploaded file
  const { image } = req.files;

  // Process the uploaded image
  // Here, you can save the image to a specific directory or perform any other required operations

  // Example: Save the image with a unique filename
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileExtension = image.name.split(".").pop();
  const filename = `${uniqueSuffix}.${fileExtension}`;
  const filePath = `public/uploads/${filename}`;

  // Move the file to the desired location
  image.mv(filePath, (error) => {
    if (error) {
      return next(error);
    }

    // Get the user ID from the request
    const { userId } = req.body;

    // o: why are you using thenable statements?

    // Update the user record with the uploaded image filename
    User.findByPk(userId)
      .then((user) => {
        user.avatarUrl = '/uploads/' + filename;
        return user.save();
      })
      .then(() => {
        res.status(200).send("Image uploaded successfully.");
      })
      .catch((error) => {
        next(error);
      });
  });
});

module.exports = router;


