// total variable
let total = 0;
// add p element to show total
$('.activities').append(`<p></p>`)
// hide p element
$('.activities p').hide();
// Focus on name field on page load
$('#name').focus();
$('#other-title').hide();
$('#title').change(event => {
	if ($('#title option:selected').val() === 'other') {
		$('#other-title').show();	
	} else {
		$('#other-title').hide();	
	}
})

$('#design').change(() => {
	if ($('#design option:selected').val() === 'js puns') {
		$('#color option:nth-child(1)').attr('selected', true);
		$('#color option').each((index, value)=> {
			$(value).show();
			if (index > 2 && index <= 5) {
				$(value).hide();
			}
		})
	} else if ($('#design option:selected').val() === 'heart js') {
		$('#color option:nth-child(4)').attr('selected', true);
		$('#color option').each((index, value)=> {
			$(value).show();
			if (index <= 2) {
				$(value).hide();
			}
		}) 
	}
})

// Disable and enable check boxes
$('.activities input[type="checkbox"]').on('change', (event) => {
	// Get cost day, and time
	const regexCost = /\d{2,}$/;
	const regexDay = /— \w+ /;
	cost = parseInt(regexCost.exec($(event.target).parent()[0].textContent)[0]);
	let day = regexDay.exec($(event.target).parent()[0].textContent);
	if (!(day === null)) {
		day = day[0];
 }
	console.log(cost);
	console.log(day)
 	// Add and subtract to/from total
	if ($(event.target).is(':checked')) {
		console.log('I am checked');
		total += cost;
	} else {
		total -= cost;
	}
	// show and hide total
	if ((total !== 0)) {
		$('.activities p').text(`$${total}`);
		$('.activities p').show();
	} else {
		$('.activities p').hide();
	}

	// target check boxes for 9am workshops
	if($(event.target).parent()[0].textContent.includes('Tuesday 9am')) {
		// disable check boxes
		$('.activities input').each((index, element) => {	
				if (!($('.activities input[type="checkbox"]')[index].checked) &&  $
				(element).parent()[0].textContent.includes('Tuesday 9am')) {
				$(element).attr('disabled', true);
				$(element).parent().css('text-decoration', 'line-through');
				$(element).parent().css('color', '#696969');
			}
		})
		// enable check boxes
		if(!$(event.target).is(':checked')) {
			$('.activities input').each((index, element) => {
				if($
					(element).parent()[0].textContent.includes('Tuesday 9am')) {
					$(element).attr('disabled', false);
					$(element).parent().css('text-decoration', 'none');
				  $(element).parent().css('color', '#000');
				}
			})			
		}
		// target check boxes for 1pm workshops
	}	else if ($(event.target).parent()[0].textContent.includes('Tuesday 1pm')) {
		// disable check boxes
		$('.activities input').each((index, element) => {
			if (!($('.activities input[type="checkbox"]')[index].checked) &&  $(element).parent()[0].textContent.includes('Tuesday 1pm')) {
				

				$(element).attr('disabled', true);
				$(element).parent().css('text-decoration', 'line-through');
				$(element).parent().css('color', '#696969');
				
			}
		})
		// enable check boxes
		if(!$(event.target).is(':checked')) {
			$('.activities input').each((index, element) => {
				if($
					(element).parent()[0].textContent.includes('Tuesday 1pm')) {
					
					
					$(element).attr('disabled', false);
					$(element).parent().css('text-decoration', 'none');
				  $(element).parent().css('color', '#000');
				}
			})
		}
	} 
		console.log(total);

})

// get PayPal and Bitcoin paragraphs
const $bitcoinPayPal = $('fieldset div p');
// store individual paragraphs
const $payPal = $bitcoinPayPal[0];
const $bitcoin = $bitcoinPayPal[1];
// hide Bitcoin and PayPal messages
$('fieldset div p').hide();

// payment information methods
const displayPayment = {
	"credit card": () => {
		$('fieldset div p').hide();
		$('#credit-card').show();
	},
	paypal: () => {
		$('fieldset div p').hide();
		$('#credit-card').hide();
		$($payPal).show();
	}, 
	bitcoin: () => {
		$('fieldset div p').hide();
		$('#credit-card').hide();
		$($bitcoin).show();
	}
}

// hide select payment method from drop down menu
$('#payment option:nth-child(1)').hide();

// Display correct payment option information
$('#payment').on('change', (event) => {
	// store selected payment option
	let $paymentOption = $('#payment option:selected').val();
	console.log($paymentOption);	
	displayPayment[$paymentOption]();
})

// trim unnecessary white space
const trimWhiteSpace = (input) => {
	return input.trim();
}

// validate Name
function isValidName(name) {
	return /^[a-zA-z\s]+$/.test(name);
}

const name = $("label[for='name']");
const nameText = $("label[for='name']").text();
$('#name').keyup(() => {	
	name.text(`${nameText} Enter a valid name`);
	if ($('#name').val().trim() === '') {
		$('#name').addClass('alert-format');
		name.css('color', 'red');
		name.text(`${nameText} Field Can't Be Blank`);
	} 
	 if (!(isValidName($('#name').val().trim()))) {
		console.log(isValidName($('#name').val().trim()));
		console.log($('#name').val());
		$('#name').addClass('alert-format');
		name.css('color', 'red');
	} else {
		console.log(isValidName($('#name').val().trim()));
		$('#name').removeClass('alert-format');
		name.css('color', 'black');
		name.text(nameText);
	}
})

function isValidEmail(email) {
	return /^[^@]+@[^@]+\.[a-z]+$/i.test(email);
}

// validate email
const mail = $("label[for='mail']");
const mailText = $("label[for='mail']").text();
$('#mail').keyup(() => {	
	mail.text(`${mailText} Enter valid email`);
	if (!(isValidEmail($('#mail').val().trim()))) {
		console.log('error');
		$('#mail').addClass('alert-format');
		mail.css('color', 'red');
	} else {
		$('#mail').removeClass('alert-format');
		mail.css('color', 'black');
		mail.text(mailText);
	}
})

// check if check box is checked
const activities = $('.activities legend');
const activitiesText = $('.activities legend').text();
$('.activities').change(() => {
	if ($('.activities input:checkbox:checked').length < 1) {
		activities.text('At least one activity must be selected');
		$('.activities').addClass('alert-format');
		activities.css('color', 'red');
	} else {
		$('.activities').removeClass('alert-format');
		activities.text(activitiesText);
		activities.css('color', 'black');
	}
})

// credit card validation methods
const creditCardValidation = {
	'cc-num': (ccNum) => {
		ccNum = ccNum.replace(/\s|-/g,"");
	  return /^\d{13,16}$/.test(ccNum);
	},
	zip: (zip) => {
		zip = zip.replace(/\s|-/g,"");
	  return /^\d{5,5}$/.test(zip);
	},
	cvv: (cvv) => {
		cvv = cvv.replace(/\s|-/g,"");
	  return /^\d{3,3}$/.test(cvv);
	}
};

$('#credit-card input').focus((event) => {
	let $paymentOption = $('#payment option:selected').val();
	console.log(event.target);
	console.log(event.target.id);
	let $inputLabel = $(`label[for="${event.target.id}"]`)
	const inputIdText = event.target.id;
	const $inputID = $(`#${inputIdText}`);
	$(event.target).keyup(() => {
		if ($paymentOption === 'credit card' || $paymentOption === 'select_method')	{
			if (!(creditCardValidation[inputIdText]($inputID.val()))) {
				console.log(creditCardValidation[inputIdText]($inputID.val()));
				$inputLabel.css('color', 'red');
				$inputID.addClass('alert-format');
			}	else {
				$inputID.removeClass('alert-format');
				$inputLabel.css('color', 'black');
			}
		}
	})
})

// prevent submission of form
$('button[type="submit"]').click((event) => {
	// Check if name is blank
	if ($('#name').val().trim() === '') {
		$('#name').addClass('alert-format');
		name.css('color', 'red');
		name.text(`${nameText} Field Can't Be Blank`);
		event.preventDefault();
		// Check if name is in correct format
	} else if (!(isValidName($('#name').val().trim()))) {
		console.log('error');
		$('#name').addClass('alert-format');
		name.css('color', 'red');
		event.preventDefault();
		// remove alert styling
	} else {
		$('#name').removeClass('alert-format');
		name.css('color', 'black');
		name.text(nameText);
	}
	// check if email is in correct format
	if (!(isValidEmail($('#mail').val().trim()))) {
		console.log('error');
		$('#mail').addClass('alert-format');
		mail.css('color', 'red');
		event.preventDefault();
		// remove alert styling
	} else {
		$('#mail').removeClass('alert-format');
		mail.css('color', 'black');
		mail.text(mailText);
	}
	// check if at least on check box is checked
	if ($('.activities input:checkbox:checked').length < 1) {
		activities.text('At least one activity must be selected');
		$('.activities').addClass('alert-format');
		activities.css('color', 'red');
		event.preventDefault();
		// remove alert styling
	} else {
		$('.activities').removeClass('alert-format');
		activities.text(activitiesText);
		activities.css('color', 'black');
	}

	// array of credit card input id text
	const ccInputIDs = ['cc-num', 'zip', 'cvv'];
	// store the value of the payment option selected
	let $paymentOption = $('#payment option:selected').val();

	// loop through each credit card input
	for (let i = 0; i < ccInputIDs.length; i++) {
		// grab label for input
		let $inputLabel = $(`label[for="${ccInputIDs[i]}"]`);
		// store input id
		let $inputID = $(`#${ccInputIDs[i]}`);
		// check payment option selected	
		if ($paymentOption === 'credit card' || $paymentOption === 'select_method')	{
			// check for valid credit card data
			if (!(creditCardValidation[ccInputIDs[i]]($inputID.val()))) {
				// set label style
				$inputLabel.css('color', 'red');
				// set input style
				$inputID.addClass('alert-format');
				// prevent submission of form
				event.preventDefault();
			}	else {
				// remove alert styling from input
				$inputID.removeClass('alert-format');
				// remove alert styling from label
				$inputLabel.css('color', 'black');
			}
		}
	}
})
