$('addHw').submit(function (e) {
	$('.alert.alert-danger').hide();
	if (!$('input#name').val() || !$('input#description').val() || !$('input#points').val()){
		if ($('.alert.alert-danger').length){
			$('.alert.alert-danger').show();
		}
		else {
			$(this).prepend('<div role="alert" class="alert alert-danger"> Missing required fields, please try again</div>');
		}
		return false;
	}	
});