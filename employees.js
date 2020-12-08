const mysql = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

const db = mysql.createConnection('mysql://root:Monkey23@localhost/employees_db')

let prompts = [
  {
    type: 'list',
    name: 'mainPrompt',
    message: 'What would you like to view?',
    choices: [
      {
        name: 'View all employees',
        value: 'view employees'
      },
      {
        name: 'View all Departments',
        value: 'view departments'
      }, 
      {
        name: 'View Roles',
        value: 'view roles'
      },
      {
      name: 'Add New Employee',
      value: 'add employee'
    }
    ]

  }
]

const employeePrompts = [
  {
    type: 'input',
    name: 'firstName',
    message: 'What is the employees first name?'
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'What is the employees last name?'
  },
  {
    type: 'list',
    name: 'addDepartment',
    message: 'What department does this employee work in?',
    choices: ['Engineering', 'Finance', 'Legal', 'Sales']
  },
  {
    type: 'list',
    name: 'addRole',
    message: 'What is this employees role?',
    choices: ['Sales Lead', ' Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', ' Lawyer']
  },
  

]

function employeeInfo(table) {
    console.log('hi');
    db.query(`SELECT * FROM ${table}`, (err, res) => {
    if (err) { console.log(err) }
    console.table(res)
    return res
  })
}

function getEmployeeData() {
  return inquirer.prompt(employeePrompts)
  
}

function addEmployee(data) {
  console.log(data);
  db.query(`INSERT INTO ${table}(data.firstname, data.lastName, data.rol)`)
  firstName, lastName, roleId, managerId
}

function handleMainPrompts(answers) {
  console.log(answers.mainPrompt);
  switch (answers.mainPrompt) {
    case 'view employees':
      console.log('hello');
      employeeInfo('employees');
      break;
    case 'view departments':
      console.log('view departments');
      employeeInfo('departments');
      break;
    case 'view roles':
      employeeInfo('roles')
      break;
    case 'add employee':
      getEmployeeData().then((res) => {
        addEmployee(res)
      })
      
    default:
      break;
  }
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