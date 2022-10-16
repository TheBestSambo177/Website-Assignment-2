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
	e.preventDefault();
	//Get the selected item
	let selectedItemText = $('#itemList').find(":selected").text();
	let selectedItemValue = $('#itemList').find(":selected").val();
	let selectedItemBond = courtesyList.find(foundItem => foundItem.item.toLowerCase() == selectedItemValue.toLowerCase()).bond;

	//Build HTML code of this item
	let newRow = `
				<tr>
					<td>$(selectedItemText)</td>
					<td>$(selectedItemBond)</td>
				<tr>			
				`;
});


//Click "Remove" button Event
//$('#removeBtn').click();

//Change "customer type" event
//$('#customerType').click();