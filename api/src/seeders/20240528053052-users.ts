import { faker } from '@faker-js/faker';
import { QueryInterface } from 'sequelize';
import { IUser } from '../interfaces/userInterface';

const generateRandomUserData = (): Omit<IUser, "id"> => {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    subscribed: generateRandomCategories(),
    channels: generateRandomChannels(),
  };
};

const generateRandomCategories = (): string[] => {
  const categories = ["Sports", "Finance", "Movies"];
  const randomCategories = faker.helpers.arrayElements(categories);
  return randomCategories;
};

const generateRandomChannels = (): string[] => {
  const channels = ["SMS", "E-Mail", "Push Notification"];
  const randomChannels = faker.helpers.arrayElements(
    channels,
    faker.helpers.rangeToNumber({ min: 1, max: 3 })
  );
  return randomChannels;
};



const up = async(queryInterface:QueryInterface) => {
  
  const userData = Array.from({ length: 100 }, () =>
    generateRandomUserData()
  );

  await queryInterface.bulkInsert('users', userData, {});
}

const down = async(queryInterface:QueryInterface) => {
  await queryInterface.bulkDelete('users', {});
}

export {
  up,
  down
}