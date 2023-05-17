import clientPromise from "./lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const { videoId, isFavorited, apiKey } = req.query;

  switch (method) {
    case "DELETE":
      try {
        const client = await clientPromise;
        const users = client.db().collection("users");

        // Find user by apiKey
        const user = await users.findOne({ "userData.apiKey": apiKey });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Remove video from user's favorites array
        const favorites = user.userData.favorites.filter(
          (favorite) => favorite !== videoId
        );
        await users.updateOne(
          { _id: user._id },
          { $set: { "userData.favorites": favorites } }
        );

        return res
          .status(200)
          .json({ message: "Video removed from favorites" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "GET":
      try {
        const client = await clientPromise;
        const users = client.db().collection("users");
        const videos = client.db().collection("Advertisements");

        // Check if the user with the provided API key exists
        const user = await users.findOne({
          "userData.apiKey": apiKey,
        });
        if (!user) {
          throw new Error("User not found");
        }

        // Fetch the user's favorite videos from the Advertisements collection
        const favoriteVideos = await videos
          .find({
            _id: { $in: user.userData.favorites.map((id) => ObjectId(id)) },
          })
          .toArray();

        // Return an array of objects containing the video ID and video data
        const favoriteVideoData = favoriteVideos.map((video) => ({
          id: video._id.toString(),
          data: video,
        }));

        res.status(200).json({ success: true, favorites: favoriteVideoData });
      } catch (error) {
        console.error("Error getting favorite status:", error);
        res.status(500).json({ success: false, error });
      }
      break;
    case "POST":
      console.log("req body: ", req.body);

      try {
        const client = await clientPromise;
        const users = client.db().collection("users");

        // Check if the user with the provided API key exists
        const user = await users.findOne({
          "userData.apiKey": req.body.apiKey,
        });
        if (!user) {
          throw new Error("User not found");
        }

        // Update the user's favorites
        users.findOneAndUpdate(
          { _id: ObjectId(user._id) },
          req.body.isFavorited
            ? {
                $set: {
                  "userData.favorites": [
                    ...user.userData.favorites,
                    req.body.videoId,
                  ],
                },
              }
            : {
                $set: {
                  "userData.favorites": user.userData.favorites.filter(
                    (id) => id !== req.body.videoId
                  ),
                },
              },
          { returnOriginal: false }
        );

        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error updating favorite status:", error);
        res.status(500).json({ success: false, error });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
