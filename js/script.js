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
	
	// target check boxes for 9am workshops
	if($(event.target).parent()[0].textContent.includes('9am')) {
		// disable check boxes
		$('.activities input').each((index, element) => {	
				if (!($('.activities input[type="checkbox"]')[index].checked) &&  $
				(element).parent()[0].textContent.includes('9am')) {
				$(element).attr('disabled', true);
				//console.log(element);
				// $(element).textContent.css('color', 'red');
			}
		})
		// enable check boxes
		if(!$(event.target).is(':checked')) {
			$('.activities input').each((index, element) => {
				if($
					(element).parent()[0].textContent.includes('9am')) {
					$(element).attr('disabled', false);
				}
			})			
		}
		// target check boxes for 1pm workshops
	}	else if ($(event.target).parent()[0].textContent.includes('1pm')) {
		// disable check boxes
		$('.activities input').each((index, element) => {
			if (!($('.activities input[type="checkbox"]')[index].checked) &&  $(element).parent()[0].textContent.includes('1pm')) {
				$(element).attr('disabled', true);
			}
		})
		// enable check boxes
		if(!$(event.target).is(':checked')) {
			$('.activities input').each((index, element) => {
				if($
					(element).parent()[0].textContent.includes('1pm')) {
					$(element).attr('disabled', false);
				}
			})
		}
	}	
})