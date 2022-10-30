//Sets the total to the starting value
$('#total').val('85.00');

//Warranty
$('#warranty').change(function() {
	if ( $(this).is(":checked")) {
		$('#serviceFee').val('0.00');
	} else {
		$('#serviceFee').val('85.00');
	}
});

let courtesyList = [{item: 'iPhone', bond: 275},
					{item: 'otherPhone', bond: 100},
					{item: 'charger', bond: 30}
				   ];
				   
//We will use "appState" object to track the form change when users interact with the app			   
let appState = {customerType: 'customer',
				courtesyPhone: {item: 'none', bond: 0 },//Allow to borrow ONLY 1 phone
				courtesyCharger: {item: 'none', bond: 0}//Allow to borrow ONLY 1 charger
			  };	

			  

//Click "Add" button Event
$('#addBtn').click(function(e) {
	//Prevent all the default function of the "add" button
	e.preventDefault();

	//Get the selected item
	let selectedItemText = $('#itemList').find(":selected").text();
	let selectedItemValue = $('#itemList').find(":selected").val();
	let selectedItemBond = courtesyList.find(foundItem => foundItem.item.toLowerCase() == selectedItemValue.toLowerCase()).bond;
	
	
	//Build HTML code of this item
	let newRow = `
				<tr class="newSelectedItem">
					<td>${selectedItemText}</td>
					<td>${selectedItemBond}</td>
				</tr>			
				`;

	//Append this new row to table if it's not existing
	if(appState.courtesyPhone.item == "none" && selectedItemValue.toLowerCase().includes("phone")){
		//Add a new row
		$('#borrowItems').append(newRow);
		//Update the appState
		appState.courtesyPhone.item = selectedItemValue;
		appState.courtesyPhone.bond = selectedItemBond;
		//Update the "bond" element
		if($('#customerType').is(':checked')){
			$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
		} else {
			$('#bond').val(0);
		}
		
	} else if (appState.courtesyCharger.item == "none" && selectedItemValue.toLowerCase().includes("charger")){
		$('#borrowItems').append(newRow);
		//Update the appState 
		appState.courtesyCharger.item = selectedItemValue;
		appState.courtesyCharger.bond = selectedItemBond;

		//Update the "bond" element
		if($('#customerType').is(':checked')){
			$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
		} else {
			$('#bond').val(0);
		}
	} else {
		alert("The item was already added");
	}
	
});

//Click "Remove" button Event
$('#removeBtn').click(function(e){
	//Prevent all default actions attached to this button.
	e.preventDefault();

	//Remove all added rows that have the classname = "newSelectedItem"
	$('.newSelectedItem').remove();

	//Update the appState
	appState.courtesyPhone = {item: 'none', bond: 0};
	appState.courtesyCharger = {item: 'none', bond: 0};

	//Update the "bond" element
	$('#bond').val(0);
});

//Change "customer type" event
$('#customerType').click(function() {
	appState.customerType = 'customer';
	$('#bond').val(appState.courtesyPhone.bond + appState.courtesyCharger.bond);
});

$('#businessType').click(function() {
	appState.customerType = 'business';
	$('#bond').val(0)
});


//Prevent Future Date
$(document).ready(function () {
	var today = new Date();
	var day=today.getDate()>9?today.getDate():"0"+today.getDate(); 
	var month=(today.getMonth()+1)>9?(today.getMonth()+1):"0"+(today.getMonth()+1);
	var year=today.getFullYear();

	$("#purchaseDate").attr('max', year + "-" + month + "-" + day);
	$("#repairDate").attr('max', year + "-" + month + "-" + day);
});


//JQUERY: FAQ SCRIPTS
let proxy = 'https://cors-anywhere.herokuapp.com/';
let url = 'http://danieldangs.com/itwd6408/json/faqs.json';

//User Jquery function "getJSON" to query this json file.
$.getJSON(
	proxy + url,//send request to this url to get Json file
	function(data){
		//Loop through all questions and extract them and
		//Display them on webpage
		$.each(data, function(i, question){//i: index, question
			//Extract question and answer
			let content =`
				<div class="col-12 col-md-6 bg-warning border border-dark">
					
						<h4>${question.question}</h4>
						<p>${question.answer}</p>
					</div>
					
				
				`;
				//append this question to the list
				$('#questions').append(content);
		});
	}//json file will be returned in "data"
);

//Search function
$('#search-box').on('keyup', function(){
	//Get entered keywords
	let keywords = $(this).val().toLowerCase();
	//Loop through all questions/answers and find if this question/answer
	//contain the keyword? If yes, if not, hide it.

	$('#questions div').filter(function(){
		$(this).toggle($(this).html().toLowerCase().indexOf(keywords) > -1);
	});
});


//Initially hide all advanced
$('.content-demo-area div').hide();


//Loop through all buttons and add "click" event to each of them
//and also the logic: hide all content sections and show only the according
//highlight background the clicked button
$('.btn-demo-area button').on('click', function(){
	//Set all buttons background to white
	$('.btn-demo-area button').css('background-color', 'white');

	//Set the clicked button background to "orange" color
	$(this).css('background-color', 'orange');

	//Hide all the content areas
	$('.content-demo-area div').hide();

	//Show only the content area matching to the clicked button
	$('.content-demo-area div').eq($(this).index()).show(1000);
});

//Upload Image
const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});


//Use Local Storage API to store and retrieve the above preferences: bg-color & font-size
		//On client side and store it permanently
		//Link: LocalStorage API: https://www.w3schools.com/jsref/prop_win_localstorage.asp
		$('#colorOption').change(function(){
			let selectedColor = $(this).find(":selected").val();
			$('#customization-card').css('background-color', selectedColor);
			localStorage.setItem('color-preference', selectedColor);
		});
		
		//Font size
		$('#sizeOption').change(function(){
			let selectedSize = $(this).find(":selected").val();
			$('#customization-card').css('font-size', selectedSize);
			localStorage.setItem('font-preference', selectedSize);
		});
		
		//Retrive stored preferences
		$('#customization-card').css('background-color', localStorage.getItem('color-preference'));
		$('#customization-card').css('font-size', localStorage.getItem('font-preference'));
		
		//Use Session Storage API to store and retrieve the above preferences: bg-color & font-size
		//On client side and store temporarily, will be cleared when the tab or window is closed.
		//Link: SessionStorage API: https://www.w3schools.com/jsref/prop_win_sessionstorage.asp