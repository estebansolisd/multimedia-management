import mongoose from "mongoose";
import Theme from "../models/Theme";
import Category from "../models/Category";
import User from "../models/User";
import bcrypt from "bcryptjs";
import Content from "../models/Content";

const seedDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  try {
    await Category.deleteMany({});
    await Theme.deleteMany({});
    await User.deleteMany({});
    await Content.deleteMany({});
    await User.insertMany([
      {
        username: "admin",
        email: "admin@admin.com",
        password: await bcrypt.hash("123", 12),
        role: "admin"
      },
      {
        username: "creator",
        email: "creator@creator.com",
        password: await bcrypt.hash("123", 12),
        role: "creator"
      },
      {
        username: "reader",
        email: "reader@reader.com",
        password: await bcrypt.hash("123", 12),
        role: "reader"
      },
    ]);
    await Theme.insertMany([
      {
        name: "Sports",
        allowsImages: true,
        allowsVideos: true,
        allowsTexts: false,
      },
      {
        name: "Maths",
        allowsImages: true,
        allowsVideos: false,
        allowsTexts: true,
      },
      {
        name: "Science",
        allowsImages: true,
        allowsVideos: true,
        allowsTexts: false,
      },
    ]);

    await Category.insertMany([
      {
        name: "Images",
        type: "image",
        thumbnail: "https://getuikit.com/v2/docs/images/placeholder_600x400.svg"
      },
      {
        name: "Videos",
        type: "video",
        thumbnail: "https://p7.hiclipart.com/preview/282/811/691/youtube-play-button-logo-graphic-designer-subscribe-thumbnail.jpg"
      },
      {
        name: "Texts",
        type: "text",
        thumbnail: "https://media.licdn.com/dms/image/D4D0BAQFGyGPjJDnoQg/company-logo_200_200/0/1692186994447/livechat_logo?e=2147483647&v=beta&t=3CoyyLe_QtV4g9qSm85VKzUuWTliMOM7plgDD_r6MJ8"
      }
    ])

    console.log('Database seeded!');
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
