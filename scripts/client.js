$(readyNow);
function readyNow() {
    $(`#addEmployeeBtn`).on(`click`, addEmployee);//, storeData
    $(`tbody`).on(`click`, '#deleteBtn', deleteEmployee);//, removeSalary
    // $(`#deleteBtn`).on(`click`, deleteEmployee); //wrong! The button doesn't exist yet and can't be targeted.
}

let staff = [];//seems helpful to create an array for later uses...

const makeDollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})


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
    }//research: button ".data()" to help update the salary?
    staff.push(empObject);
    currentSalary += salary;

    $(`#employeeTable`).prepend(`
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${empNumber}</td>
                <td>${title}</td>
                <td class="targetSalary" >${salary}</td>
                <td>
                <button id="deleteBtn"> Remove Employee </button>
                </td>
            </tr>
            `)

    $(`input`).val('');
    appendMonthlyCost();
    //storeData, or something else
}


let totalMonthlyCost = 0;
let currentSalary = 0;//being populated from inside addEmployee
let accumulatedSalary = 0;

function appendMonthlyCost() {
    //console.log('in appendMonthlyCost');
    totalMonthlyCost = (currentSalary / 12);
    $(`#monthlyCostSpan`).empty();
    // $(`#monthlyCostSpan`).removeClass('.noSalary');
    // $(`#monthlyCostSpan`).addClass('.yesSalary');
    accumulatedSalary += totalMonthlyCost;
    $(`#monthlyCostSpan`).append(makeDollars.format(accumulatedSalary));
    currentSalary = 0;
    warningRed();
}

function warningRed() {
    //console.log('in warningRed');
    if (totalMonthlyCost > 20000) {
        $('#monthlyCostSpan').toggleClass('warning');
    }
}

function deleteEmployee() {
let obsolete = Number($(this).parent().prev('.targetSalary').text());
accumulatedSalary = accumulatedSalary - (obsolete/12);
$('#monthlyCostSpan').text(makeDollars.format(accumulatedSalary));
   $(this).closest('tr').empty();
   warningRed()
}


//***Note: potentially refactor addEmployee to call separate "appendTable"?
// function appendTable() {
//     //for (let person of staff) {
//     $(`#employeeTable`).append(`
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

//the version below toggles between no formatting and "noSalary", 
//but does not activate "yesSalary"

// totalMonthlyCost = ((salary + totalMonthlyCost) / 12);
//     $(`#monthlyCostSpan`).empty();
//     $(`#monthlyCostSpan`).append(makeDollars.format(totalMonthlyCost));
//     if ($('#monthlyCostSpan').val() === 0 || $('#monthlyCostSpan').val() === undefined) {
//         $('#monthlyCostSpan').toggleClass('noSalary');
//     }
//     else {
//         $('#monthlyCostSpan').toggleClass('yesSalary');
//     }

//this version toggles between "noSalary" and "yesSalary" (conditional didn't affect it)
// if ($('#monthlyCostSpan').val() === 0 || $('#monthlyCostSpan').val() === undefined) {
//     $('#monthlyCostSpan').toggleClass('noSalary');
// }
// else {
//     $('#monthlyCostSpan').toggleClass('yesSalary');
// }


