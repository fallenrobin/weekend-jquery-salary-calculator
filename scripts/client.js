$(readyNow);
function readyNow() {
    $(`#addEmployeeBtn`).on(`click`, addEmployee);
}

let staff = [];


function addEmployee() {
    let firstName = $(`#firstName`).val();
    let lastName = $(`#lastName`).val();
    let empNumber = $(`#empNumber`).val();
    let title = $(`#title`).val();
    let salary = $(`#salary`).val();

    let empObject = {
        firstName: firstName,
        lastName: lastName,
        empNumber: empNumber,
        title: title,
        salary: salary
    }
    staff.push(empObject);
    appendTable();
    //research button ".data()"...to help update the salary?

    // calc salary

}

function appendTable() {
    for (let person of staff) {
        $(`#employeeTable`).append(`
        <tr>
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td>${person.empNumber}</td>
                <td>${person.title}</td>
                <td>${person.salary}</td>
            </tr>
        `)
    }
    $(`input`).val('');
}