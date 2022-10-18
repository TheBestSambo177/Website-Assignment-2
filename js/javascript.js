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