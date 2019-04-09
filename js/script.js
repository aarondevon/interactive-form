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
		//$('#other-title').show();	
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
		//day = regexDay.exec($(event.target).parent().textContent)[0];
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
		
		// let cost = parseInt($(event.target).parent()[0].textContent.substr(-3));
		// console.log(cost);
		// total += cost;
		console.log(total);

})

// get PayPal and Bitcoin paragraphs
const $bitcoinPayPal = $('fieldset div p');
// store individual paragraphs
const $payPal = $bitcoinPayPal[0];
const $bitcoin = $bitcoinPayPal[1];
// hide Bitcoin and PayPal messages
$('fieldset div p').hide();

// Credit Card as default
// $('#payment option:nth-child(2)').attr('selected', true);
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



// const alertBorder = (element) => {
// 	$(element).css("border-color": "#C1E0FF", 
// 	"border-width":"1px", 
// 	"border-style":"solid");
// }

// trim unnecessary white space
const trimWhiteSpace = (input) => {
	return input.trim();
}

// validate email
function isValidName(name) {
	return /^[a-z]+$/.test(name);
}

const name = $("label[for='name']");
const nameText = $("label[for='name']").text();
$('#name').keyup(() => {	
	name.text(`${nameText} Enter a valid name`);
	if ($('#name').val().trim() === '') {
		$('#name').addClass('alert-border');
		name.css('color', 'red');
		name.text(`${nameText} Field Can't Be Blank`);
	} else if (!(isValidName($('#name').val().trim()))) {
		console.log('error');
		$('#name').addClass('alert-border');
		name.css('color', 'red');
	} else {
		$('#name').removeClass('alert-border');
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
		$('#mail').addClass('alert-border');
		mail.css('color', 'red');
	} else {
		$('#mail').removeClass('alert-border');
		mail.css('color', 'black');
		mail.text(mailText);
	}
})

// prevent submission of form
$('button[type="submit"]').click((event) => {
	event.preventDefault();
	console.log('prevented');
})

// check if check box is checked
const activities = $('.activities legend');
const activitiesText = $('.activities legend').text();
$('.activities').change(() => {
	if ($('.activities input:checkbox:checked').length < 1) {
		activities.text('At least one activity must be selected');
		$('.activities').addClass('alert-border');
		activities.css('color', 'red');
	} else {
		$('.activities').removeClass('alert-border');
		activities.text(activitiesText);
		activities.css('color', 'black');
	}
})