let total = 0;

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