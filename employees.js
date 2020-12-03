const mysql = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

const db = mysql.createConnection('mysql://root:Monkey23@localhost/employees_db')

let prompts = [
  {
    type: 'list',
    name: 'name',
    message: 'What would you like to view?',
    choices: [
      {
        name: 'View all employees',
        value: 'view employees'
      },
      // {
      //   name: 'View all Departments',
      //   value: 'view departments'
      // }
    ]

  }
]
function handleMainPrompts(answers) {
  console.log(answers.name);
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    console.table(employees)
  })
}
inquirer.prompt(prompts).then(handleMainPrompts)



// const db = mysql.createConnection('mysql://root:rootroot@localhost/employees_db')



// db.query(`
//   SELECT roles.id, roles.title, roles.salary, departments.name AS department
//   FROM roles
//   LEFT JOIN departments
//   ON roles.departmentId = departments.id
//   `, (err, roles) => {
//     if (err) { console.log(err) }
//     console.log(roles)
//   })

// db.query(`
//   SELECT employees.id, employees.firstName, employees.lastName, roles.title, roles.salary, departments.name AS department, CONCAT(manager.firstName, ' ', manager.lastName) AS manager
//   FROM employees LEFT JOIN roles ON employees.roleId = roles.id
//   LEFT JOIN departments ON roles.departmentId = departments.id
//   LEFT JOIN employees manager on manager.id = employees.managerId
// `, (err, employees) => {
//   if (err) { console.log(err) }
//   console.log(employees)
// })