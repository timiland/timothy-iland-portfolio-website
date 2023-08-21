module.exports = (plop) => {
  plop.setGenerator('Create a new component', {
    description: 'Create a component with Story.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter component name:',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Please choose component type:',
        choices: ['Atoms', 'Molecules', 'Organisms'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{lowerCase type}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      // {
      //   type: 'add',
      //   path: 'components/{{lowerCase type}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
      //   templateFile: 'plop-templates/stories.tsx.hbs',
      // },
      // {
      //   type: 'add',
      //   path: 'components/{{lowerCase type}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
      //   templateFile: 'plop-templates/test.tsx.hbs',
      // },
      // {
      //   type: 'add',
      //   path: 'models/I{{pascalCase name}}.ts',
      //   templateFile: 'plop-templates/model.ts.hbs',
      // },
    ],
  });
};
