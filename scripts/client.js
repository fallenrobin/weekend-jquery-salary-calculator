$(readyNow);
function readyNow() {
    $(`#addEmployeeBtn`).on(`click`, addEmployee);
    $(`tbody`).on(`click`, '#deleteBtn', deleteEmployee);
    //$(`#deleteBtn`).on(`click`, deleteEmployee); wrong!

}

let staff = [];
let totalRunningCost = 0;


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

    $(`#employeeTable`).append(`
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${empNumber}</td>
                <td>${title}</td>
                <td>${salary}</td>
                <td>
                <button id="deleteBtn"> Remove Employee </button>
                </td>
            </tr>
            
            `)
    $(`input`).val('');
    $(`#totalCost`).append(totalRunningCost += Number(salary));
    warningRed();

    //research button ".data()"...to help update the salary?
    // calc salary

}

function warningRed() {
    if (Number(totalRunningCost > 20000)){
$('#totalCost').toggleClass('warning');
    }
}


//***Note: potentially refactor addEmployee to call separate "appendTable"
// function appendTable() {
//     //for (let person of staff) {
//     $(`#employ`eeTable`).append(`
//         <tr>
//                 <td>${firstName}</td>
//                 <td>${person.lastName}</td>
//                 <td>${person.empNumber}</td>
//                 <td>${person.title}</td>
//                 <td>${person.salary}</td>
//                 <td>
//                 <button id="deleteBtn"> Remove Employee </button>
//                 </td>
//             </tr>
//         `)
//     //}
//     $(`input`).val('');
// }



function deleteEmployee() {
    $(this).closest('tr').empty();
    console.log('in deleteBtn');

}