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
    let title = $(`#title`).val();
    let empNumber = $(`#empNumber`).val();
    let salary = $(`#salary`).val();

    let empObject = {
        firstName: firstName,
        lastName: lastName,
        title: title,
        empNumber: empNumber,
        salary: salary
    }
    staff.push(empObject);
    currentSalary += salary;

    $(`#employeeTable`).prepend(`
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${$(`#title`).val()}</td>
                <td>${empNumber}</td>
                <td class="targetSalary" >${salary}</td>
                <td>
                <button id="deleteBtn"> Remove Employee </button>
                </td>
            </tr>
            `);//in line 39 I tried to get around the "title" variable thinking it might fix it, but it still doesn't work

            console.log(title);//trying to troubleshoot
            

    $(`input`).val('');
    updateMonthlyCost();
}


let totalMonthlyCost = 0;
let currentSalary = 0;//being populated from inside addEmployee
let accumulatedSalary = 0;


function updateMonthlyCost() {
    //console.log('in appendMonthlyCost');
    totalMonthlyCost = (currentSalary / 12);
    $(`#monthlyCostSpan`).empty();
    // $(`#monthlyCostSpan`).removeClass('.noSalary');//this idea didn't pan out, see below
    // $(`#monthlyCostSpan`).addClass('.yesSalary');//this idea didn't pan out, see below
    accumulatedSalary += totalMonthlyCost;
    $(`#monthlyCostSpan`).append(makeDollars.format(accumulatedSalary));
    currentSalary = 0;
    warningRed();
}

function warningRed() {
    //console.log('in warningRed');
    if (Number(accumulatedSalary) > 20000) {
        $('#monthlyCostSpan').addClass('warning');
    }
    if (Number(accumulatedSalary) < 20000) {
        $('#monthlyCostSpan').removeClass('warning');
    }
}

function deleteEmployee() {
    let obsolete = Number($(this).parent().prev('.targetSalary').text());
    accumulatedSalary = accumulatedSalary - (obsolete / 12);
    $('#monthlyCostSpan').text(makeDollars.format(accumulatedSalary));
    $(this).closest('tr').empty();
    warningRed()
}



//the version below toggles between no formatting and "noSalary", 
//but does not activate "yesSalary"... also suspect it's overridden by BS table styling

// totalMonthlyCost = ((salary + totalMonthlyCost) / 12);
//     $(`#monthlyCostSpan`).empty();
//     $(`#monthlyCostSpan`).append(makeDollars.format(totalMonthlyCost));
//     if ($('#monthlyCostSpan').val() === 0 || $('#monthlyCostSpan').val() === undefined) {
//         $('#monthlyCostSpan').toggleClass('noSalary');
//     }
//     else {
//         $('#monthlyCostSpan').toggleClass('yesSalary');
//     }

//this version just toggles between "noSalary" and "yesSalary" (conditional didn't affect it)
//... also suspect it's overridden by BS table styling
// if ($('#monthlyCostSpan').val() === 0 || $('#monthlyCostSpan').val() === undefined) {
//     $('#monthlyCostSpan').toggleClass('noSalary');
// }
// else {
//     $('#monthlyCostSpan').toggleClass('yesSalary');
// }


