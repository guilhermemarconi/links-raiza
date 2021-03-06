module.exports = function (plop) {
  plop.setGenerator('react-component', {
    description: 'React Component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../components/{{pascalCase name}}/index.jsx',
        templateFile: 'templates/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: '../components/{{pascalCase name}}/styles.js',
        templateFile: 'templates/styles.js.hbs',
      },
      {
        type: 'add',
        path: '../components/{{pascalCase name}}/stories.js',
        templateFile: 'templates/stories.js.hbs',
      },
    ],
  });
};
