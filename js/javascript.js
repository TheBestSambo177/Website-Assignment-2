//Create a 'Booking' class to populate the booking form
class Booking {
    //Constructor
    constructor() {
        //Personal Customer information
        this.customerType = "consumer";
        this.title = "";
        this.firstName = "";
        this.lastName = "";
        this.street = "";
        this.suburb = "";
        this.city = "";
        this.postCode = "";
        this.phone = "";
        this.email = "";
        //Repair Job
        this.jobNo = "";
        this.invDate = "";
        this.payDueDate = "";
        //Repair Details
        this.purcDate = "";
        this.repDate = "";
        this.warranty = false;
        this.imeiNo = "";
        this.deviceMake = "";
        this.modelNo = "";
        this.faultCat = "";
        this.faultDesc = "";
        //Courtesy Loan Device Details
        this.inputTable = "";
        this.courtesy_phone = "";
        this.phone_bond = 0;
        this.courtesy_charger = "";
        this.charger_bond = 0;
        //Totals
        this.bondAmount = 0;
        this.serviceFee = 85;
        this.totalAmount = 0;
        this.gstAmount = 0;
        this.totalGST = 0;
    }

    //Methods

    updateProperties() {
        //Name
        this.title = document.getElementById("title").value;
        this.firstName = document.getElementById("fName").value;
        this.lastName = document.getElementById("lName").value;
        this.street = document.getElementById("street").value;
        this.suburb = document.getElementById("suburb").value;
        this.city = document.getElementById("city").value;
        this.postCode = document.getElementById("postalCode").value;
        this.phoneNo = document.getElementById("phoneNumber").value;
        this.email = document.getElementById("email").value;
        //Repair Job
        localStorage.setItem("jobNo", +localStorage.getItem("jobNo") + 1)
        this.jobNo = localStorage.getItem("jobNo")
        let dateTime = new Date();
        this.invDate = (dateTime.getFullYear()) + "/" + (dateTime.getMonth()) + "/" + (dateTime.getDate()) + " " + (dateTime.getHours()) + ":" + (dateTime.getMinutes()) + ":" + (dateTime.getSeconds());
        this.payDueDate = ((dateTime.getFullYear()) + "/" + (dateTime.getMonth()) + "/" + (dateTime.getDate() + 5));
        //Repair Details
        this.purcDate = document.getElementById("purchaseDate").value;
        this.repDate = document.getElementById("repairDate").value;
        this.imeiNo = document.getElementById("IMEI_Number").value;
        this.deviceMake = document.getElementById("make").value;
        this.modelNo = document.getElementById("modelNumber").value;
        this.faultCat = document.getElementById("faultCategory").value;
        this.faultDesc = document.getElementById("description").value;
        //Courtesy Loan Device Details
        this.itemTable = document.getElementById("borrowItems").outerHTML;
        //Totals
        this.bondAmount = document.getElementById("bond").value;
        this.serviceFee = document.getElementById("serviceFee").value;
        this.totalAmount = document.getElementById("total").value;
        this.gstAmount = document.getElementById("GST").value;
        this.totalGST = document.getElementById("total_With_GST").value;

    }
}

//Sets the service fee at the start
$("#serviceFee").val("85.00");

//Warranty
$("#warranty").change(function () {
    if ($(this).is(":checked")) {
        $("#serviceFee").val("0.00");
    } else {
        $("#serviceFee").val("85.00");
    };
});

let courtesyList = [
    { item: "iPhone", bond: 275 },
    { item: "otherPhone", bond: 100 },
    { item: "charger", bond: 30 },
];

//We will use "appState" object to track the form change when users interact with the app
let appState = {
    customerType: "customer",
    courtesyPhone: { item: "none", bond: 0 }, //Allow to borrow ONLY 1 phone
    courtesyCharger: { item: "none", bond: 0 }, //Allow to borrow ONLY 1 charger
};

//Click "Add" button Event
$("#addBtn").click(function (e) {
    //Prevent all the default function of the "add" button
    e.preventDefault();

    //Get the selected item
    let selectedItemText = $("#itemList").find(":selected").text();
    let selectedItemValue = $("#itemList").find(":selected").val();
    let selectedItemBond = courtesyList.find((foundItem) => foundItem.item.toLowerCase() == selectedItemValue.toLowerCase()).bond;

    //Build HTML code of this item
    let newRow = `
				<tr class="newSelectedItem">
					<td>${selectedItemText}</td>
					<td>${selectedItemBond}</td>
				</tr>			
				`;

    //Append this new row to table if it's not existing
    if (appState.courtesyPhone.item == "none" && selectedItemValue.toLowerCase().includes("phone")) {
        //Add a new row
        $("#borrowItems").append(newRow);
        //Update the appState
        appState.courtesyPhone.item = selectedItemValue;
        appState.courtesyPhone.bond = selectedItemBond;
        //Update the "bond" element
        if ($("#customerType").is(":checked")) {
            $("#bond").val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
        } else {
            $("#bond").val(0);
        }
    } else if (appState.courtesyCharger.item == "none" && selectedItemValue.toLowerCase().includes("charger")) {
        $("#borrowItems").append(newRow);
        //Update the appState
        appState.courtesyCharger.item = selectedItemValue;
        appState.courtesyCharger.bond = selectedItemBond;

        //Update the "bond" element
        if ($("#customerType").is(":checked")) {
            $("#bond").val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
        } else {
            $("#bond").val(0);
        }
    } else {
        alert("The item was already added");
    }
});

//Click "Remove" button Event
$("#removeBtn").click(function (e) {
    //Prevent all default actions attached to this button.
    e.preventDefault();

    //Remove all added rows that have the classname = "newSelectedItem"
    $(".newSelectedItem").remove();

    //Update the appState
    appState.courtesyPhone = { item: "none", bond: 0 };
    appState.courtesyCharger = { item: "none", bond: 0 };

    //Update the "bond" element
    $("#bond").val(0);
});

//Change "customer type" event
$("#customerType").click(function () {
    appState.customerType = "customer";
    $("#bond").val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
});

$("#businessType").click(function () {
    appState.customerType = "business";
    $("#bond").val(0);
});



//Total + GST Calculation
$("#addBtn, #removeBtn").click(function () {
    var bondValue = $("#bond").val();
    var serviceValue = $("#serviceFee").val();

    var totalPrice = +bondValue + +serviceValue;
    var fullGST = (totalPrice / 20) * 3;
    var completePrice = +totalPrice + +fullGST;

    $("#total").val(totalPrice);
    $("#GST").val(fullGST);
    $("#total_With_GST").val(completePrice);
});

$("#customerType, #businessType, #warranty").change(function () {
    var bondValue = $("#bond").val();
    var serviceValue = $("#serviceFee").val();

    var totalPrice = +bondValue + +serviceValue;
    var fullGST = (totalPrice / 20) * 3;
    var completePrice = +totalPrice + +fullGST;

    $("#total").val(totalPrice);
    $("#GST").val(fullGST);
    $("#total_With_GST").val(completePrice);
});

//Disable warranty if purchase date is greater than 24 months
$("#purchaseDate").change(function () {
    var date = new Date();
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);

    //Warrenty Year
    var warrantyYear = date.getFullYear() - 2;

    //Current date and the current date two years ago stored as variables
    var fullWarrantyYear = warrantyYear + "-" + month + "-" + day;
    var purchaseDate = $("#purchaseDate").val();

    //If the purchase date was 24 months or greater disable the warranty
    if (purchaseDate <= fullWarrantyYear) {
        $("#warranty").prop("disabled", true);
        $("#warranty").prop("checked", false);
        $("#serviceFee").val("85.00");
    } else {
        $("#warranty").prop("disabled", false);
    }
});


//Get the current date and set it as the maximum possible value for the purchase date input box.
$("#submitBtn").click(function () {
    var date = new Date();
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
    var year = date.getFullYear();

    //Full date in one variable
    var fullDate = year + "-" + month + "-" + day;

    $("#purchaseDate").attr("max", fullDate);

    var end = $("#purchaseDate").val();
    $("#repairDate").attr("min", end);
    $("#repairDate").attr("max", fullDate);
});

//Updates when reset button is clicked
$("#resetBtn").click(function () {
    //Remove all added rows that have the classname = "newSelectedItem"
    $(".newSelectedItem").remove();

    //Update the appState
    appState.courtesyPhone = { item: "none", bond: 0 };
    appState.courtesyCharger = { item: "none", bond: 0 };
});

//JQUERY: FAQ SCRIPTS
let proxy = "https://cors-anywhere.herokuapp.com/";
let url = "http://danieldangs.com/itwd6408/json/faqs.json";

//User Jquery function "getJSON" to query this json file.
$.getJSON(
    proxy + url, //send request to this url to get Json file
    function (data) {
        //Loop through all questions and extract them and
        //Display them on webpage
        $.each(data, function (i, question) {
            //i: index, question
            //Extract question and answer
            let content = `
				<div class="col-12 col-md-6 bg-warning border border-dark">
					
						<h4>${question.question}</h4>
						<p>${question.answer}</p>
					</div>
					
				
				`;
            //append this question to the list
            $("#questions").append(content);
        });
    } //json file will be returned in "data"
);

//Search function
$("#search-box").on("keyup", function () {
    //Get entered keywords
    let keywords = $(this).val().toLowerCase();
    //Loop through all questions/answers and find if this question/answer
    //contain the keyword? If yes, if not, hide it.

    $("#questions div").filter(function () {
        $(this).toggle($(this).html().toLowerCase().indexOf(keywords) > -1);
    });
});

//Initially hide all advanced
//$(".content-demo-area div ").hide();
$("#content-area-1").hide();
$("#content-area-2").hide();
$("#content-area-3").hide();
$("#content-area-4").hide();
$("#content-area-5").hide();

//Loop through all buttons and add "click" event to each of them
//and also the logic: hide all content sections and show only the according
//highlight background the clicked button
$(".btn-demo-area button").on("click", function () {
    //Set all buttons background to white
    $(".btn-demo-area button").css("background-color", "white");

    //Set the clicked button background to "orange" color
    $(this).css("background-color", "orange");

    //Hide all the content areas
    //$(".content-demo-area div").hide();
    $("#content-area-1").hide();
    $("#content-area-2").hide();
    $("#content-area-3").hide();
    $("#content-area-4").hide();
    $("#content-area-5").hide();

    //Show only the content area matching to the clicked button
    //$(".content-demo-area div").eq($(this).index()).show(1000);
    //$("#content-area-5").eq($(this).index()).show(1000);
});

$("#content-btn-1").on("click", function () {
    $("#content-area-1").show(1000);
})

$("#content-btn-2").on("click", function () {
    $("#content-area-2").show(1000);
})

$("#content-btn-3").on("click", function () {
    $("#content-area-3").show(1000);
})

$("#content-btn-4").on("click", function () {
    $("#content-area-4").show(1000);
})

$("#content-btn-5").on("click", function () {
    $("#content-area-5").show(1000);
})



//Use Local Storage API to store and retrieve the above preferences: bg-color & font-size
//On client side and store it permanently
//Link: LocalStorage API: https://www.w3schools.com/jsref/prop_win_localstorage.asp
$("#colorOption").change(function () {
    let selectedColor = $(this).find(":selected").val();
    $("#customization-card").css("background-color", selectedColor);
    localStorage.setItem("color-preference", selectedColor);
});

//Font size
$("#sizeOption").change(function () {
    let selectedSize = $(this).find(":selected").val();
    $("#customization-card").css("font-size", selectedSize);
    localStorage.setItem("font-preference", selectedSize);
});

//Retrive stored preferences
$("#customization-card").css("background-color", localStorage.getItem("color-preference"));
$("#customization-card").css("font-size", localStorage.getItem("font-preference"));

//Use Session Storage API to store and retrieve the above preferences: bg-color & font-size
//On client side and store temporarily, will be cleared when the tab or window is closed.
//Link: SessionStorage API: https://www.w3schools.com/jsref/prop_win_sessionstorage.asp


//Map
$('svg path').each(function(index, item) {
    var id = $(item).attr('id');
        
    $('svg #' + id).on('click', function(e) {
        var id = $(e.currentTarget).attr('id');
        $('svg path').removeClass('active');
        $(e.currentTarget).addClass('active');
        window.alert(id + ' Clicked');
    });
});

//Geolocation
let x = document.getElementById("geoLocation");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
}  

//Validation works, sends data to repair page
$("#formData").submit(function(e) {
    //Prevent the page from refreshing
    e.preventDefault()
    window.open("repair.html");
})

//Repair Page
function populateForm() {
    //Retrive the data sent from index.html stored in local storage and replace the repair values
    document.getElementById("nameInfo").innerHTML= localStorage.getItem("nameValue");
    document.getElementById("street").innerHTML=localStorage.getItem("streetL");
    document.getElementById("fullAddress").innerHTML=localStorage.getItem("full_Address");
    document.getElementById("phoneNo").innerHTML=localStorage.getItem("phoneNumber");
    document.getElementById("email").innerHTML=localStorage.getItem("emailAddress");

    document.getElementById("purchaseDate").innerHTML=localStorage.getItem("purchaseValue");
    document.getElementById("repairDateTime").innerHTML=localStorage.getItem("repairValue");
    document.getElementById("warranty").innerHTML=localStorage.getItem("warrantyValue");
    document.getElementById("imeiNo").innerHTML=localStorage.getItem("imeiValue");
    document.getElementById("deviceMake").innerHTML=localStorage.getItem("makeValue");
    document.getElementById("modelNo").innerHTML=localStorage.getItem("modelValue");
    document.getElementById("faultCato").innerHTML=localStorage.getItem("faultValue");
    document.getElementById("faultDesc").innerHTML=localStorage.getItem("descriptionValue");
    
    let myBookingObj = JSON.parse(localStorage.getItem("myBookingInput"));
    //Courtesy Loan Device Details
    document.getElementById("itemTable").outerHTML = myBookingObj.itemTable;
    //Totals
    document.getElementById("bond").innerHTML = ("$" + myBookingObj.bondAmount);
    document.getElementById("servFee").innerHTML = ("$" + myBookingObj.serviceFee);
    document.getElementById("total").innerHTML = ("$" + myBookingObj.totalAmount);
    document.getElementById("gst").innerHTML = ("$" + myBookingObj.gstAmount);
    document.getElementById("totalGST").innerHTML = ("$" + myBookingObj.totalGST);
    document.getElementById("amountTotal").innerHTML = ("$" + myBookingObj.totalGST);
}

function init() { 
    localStorage.setItem("jobNo", 0000)
}


function saveData() {
    //Name
    var title = $('#title').val();
    var firstName = $("#fName").val();
    var lastName = $("#lName").val();
    var fullName = (title + " " + firstName + " " + lastName);
    
    //Location
    var street = $('#street').val();
    var suburb = $('#suburb').val();
    var city = $('#city').val();
    var postcode = $('#postalCode').val();
    var fullAddress = (suburb + ", " + city + " " + postcode);

    //Contact Details
    var phone = $('#phoneNumber').val();
    var email = $('#email').val();

    //Dates
    var purchaseDate = $('#purchaseDate').val();
    var repairDate = $('#repairDate').val();

    //Warranty  
    if ($('#warranty').is(':checked')) {
        var warrantyText = $("#warranty").is(':checked');
        var warrantyInfo = ("&#10004;"+ warrantyText);
    } else {
        var warrantyText = $("#warranty").is(':checked');
        var warrantyInfo = ("&#10005;"+ warrantyText);
    }
    //Information
    var IMEI = $("#IMEI_Number").val();
    var phoneMake = $("#make").val();
    var modelNum = $("#modelNumber").val();
    var faultCategory = $("#faultCategory").val();
    var addDescription = $("#description").val();

    //Saves the data
    localStorage.setItem("nameValue", fullName)
    localStorage.setItem("streetL", street)
    localStorage.setItem("full_Address", fullAddress)
    localStorage.setItem("phoneNumber", phone)
    localStorage.setItem("emailAddress", email)
    localStorage.setItem("purchaseValue", purchaseDate)
    localStorage.setItem("repairValue", repairDate)
    localStorage.setItem("warrantyValue", warrantyInfo)
    localStorage.setItem("imeiValue", IMEI)
    localStorage.setItem("makeValue", phoneMake)
    localStorage.setItem("modelValue", modelNum)
    localStorage.setItem("faultValue", faultCategory)
    localStorage.setItem("descriptionValue", addDescription)
}

//localStorage.setItem("jobNo", +localStorage.getItem("jobNo") + 1)