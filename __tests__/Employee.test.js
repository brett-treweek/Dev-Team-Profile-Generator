const Employee = require("../lib/Employee");

describe("Employee", () => {
  
  it("Can create a new Employee object", () => {
    const employee = new Employee();
    expect(typeof employee).toBe('object');
  });

  it("Name, email, id and role are keys in new Employee", () => {
    const employee = new Employee();
    expect(employee.hasOwnProperty('name') && employee.hasOwnProperty('email') && employee.hasOwnProperty('id') && employee.hasOwnProperty('role')).toBe(true);
  });

  it("Name, email, id and role are undefined if no parameters are given", () => {
    const employee = new Employee();
    expect(employee.name && employee.email && employee.id && employee.role).toBe(undefined);
  });

  it("Can set name, email, id and role with arguments", () => {
    const employee = new Employee('Brett','01', 'brett@gmail.com', 'Goldfish');
    expect(employee.name).toBe('Brett');
    expect(employee.email).toBe('brett@gmail.com');
    expect(employee.id).toBe('01');
    expect(employee.role).toBe('Goldfish');
  });

  it("will return the name when getName method is invoked", () => {
    const employee = new Employee('Brett','01', 'brett@gmail.com', 'Goldfish');
    expect(employee.getName()).toBe('Brett');
  });

  it("will return the email when getEmail method is invoked", () => {
    const employee = new Employee('Brett','01', 'brett@gmail.com', 'Goldfish');
    expect(employee.getEmail()).toBe('brett@gmail.com');
  });

  it("will return the ID when getId method is invoked", () => {
    const employee = new Employee('Brett','01', 'brett@gmail.com', 'Goldfish');
    expect(employee.getId()).toBe('01');
  });

  it("will return the role when getRole method is invoked", () => {
    const employee = new Employee('Brett','01', 'brett@gmail.com', 'Goldfish');
    expect(employee.getRole()).toBe('Goldfish');
  });

});
