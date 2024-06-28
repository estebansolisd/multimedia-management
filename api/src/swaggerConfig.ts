import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Content Management API',
      version: '1.0.0',
      description: 'API for managing content, categories, and themes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], // Paths to files with Swagger annotations
};

const specs = swaggerJsDoc(options);

export default specs;
