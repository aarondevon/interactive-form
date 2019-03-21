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