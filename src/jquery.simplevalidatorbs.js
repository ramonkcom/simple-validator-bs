/*
+---------------------------------------------------------------------------+
| Simple Validator (jquery.simplevalidatorbs.min.js)                          |
+---------------------------------------------------------------------------+
| Author        : Ramon Kayo                                                |
| Email         : contato@ramonkayo.com                                     |
| License       : Distributed under the MIT License                         |
+---------------------------------------------------------------------------+
| "Simplicity is the ultimate sophistication." - Leonardo Da Vinci          |
+---------------------------------------------------------------------------+
| Last modified : 2015-09-24                                                |
+---------------------------------------------------------------------------+
*/
(function ($){
	$.fn.hasAttr = function(attrName) {
		var attr = $(this).attr(attrName);
		return (typeof attr !== 'undefined' && attr !== false);
	};
	$.fn.resetInput = function(options) {
		var settings = {
			skipSelector: '',
			eachField: function(){}
		};

		if (options == null || typeof options != 'object') {
			options = {}
		}
		jQuery.extend(settings, options);

		$(this).find('.has-warning, .has-error, .has-success').removeClass('has-warning has-error has-success');
		$(this).find('.help-block').hide();

		$(this).find('input, select, textarea').each(function(){
			if ($(this).is(settings.skipSelector)) return true;
			
			$(this)
				.val('')
				.prop('selected', false)
				.prop('checked', false);

			settings.eachField($(this));
		});
		return $(this);
	};
	$.fn.validateInput = function(options) {
		var settings = {
			afterTesting : function(field, valid) {
				var $container = $(field).closest('.form-group, .checkbox, .radio');
				var className = valid ? 'has-success' : 'has-error';
				$container
					.removeClass('has-warning has-error has-success')
					.addClass(className);

				if (valid) $container.find('.help-block').hide();
				else $container.find('.help-block').show();
			},
			textValidation : function(field) {
				var value = field.val();
				var length = value.length;
	    		if (!(/\S/.test(value))) return false;
	    		if (field.hasAttr('minlength') && length < field.attr('minlength')) return false; 
	    		if (field.hasAttr('maxlength') && length > field.attr('maxlength')) return false;
	    		return true;
			},
			numberValidation : function(field) {
				console.log('?');
				var value = field.val();
				var length = value.length;
				if (field.hasAttr('minlength') && length < field.attr('minlength')) return false; 
				if (field.hasAttr('maxlength') && length > field.attr('maxlength')) return false;
				value = parseFloat(field.val());
	    		if (isNaN(value))  return false;
	    		if (field.hasAttr('min') && value < field.attr('min')) return false; 
	    		if (field.hasAttr('max') && value > field.attr('max')) return false;
	    		return true;
			},
			emailValidation : function(field) {
				var value = field.val();
				var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	    		return regex.test(value);
			},
			passwordValidation : function(field) {
				var value = field.val();
				var length = value.length;
	    		if (!(/\S/.test(value))) return false;
	    		if (field.hasAttr('minlength') && length < field.attr('minlength')) return false;
	    		if (field.hasAttr('maxlength') && length > field.attr('maxlength')) return false;
				return true;
			},
			urlValidation : function(field) {
				var value = field.val();
				var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			    return regex.test(value);
			},
			selectValidation : function(field) {
				var value = field.val();
				return ($.trim(value) != '');
			},
			fileValidation : function(field) {
				var value = field.val();
	    		var extension = value.split('.').pop().toLowerCase();
	    		var extensions = field.hasAttr('data-types') ? field.data('types').split(',') : [];
	    		if ($.inArray(extension, extensions) == -1) return false;
				return true;
			},
			telValidation : function(field) {
				var value = field.val();
				var regex = /^([0-9()+ -])+$/;
	    		return regex.test(value);
			}
		};
		
		if (options == null || typeof options != 'object') {
			options = {}
		}
		jQuery.extend(settings, options);
		
		var validForm = true;
	    $(this).find('input, select, textarea').each(function() {
	    	if (
	    		!$(this).hasAttr('required') && 
	    		(!$(this).hasAttr('data-validate') || $(this).attr('data-validate') != '1')
	    	) return true;
	    	
	    	var value = $(this).val();
	    	
	    	if (
	    		!$(this).hasAttr('required') && 
	    		(value == null || value == undefined || $.trim(value) == '')
	    	) {
	    		valid = true;
	    	} else {
	    		if ($(this).hasAttr('type')) {
	    			var type = $(this).attr('type').toLowerCase();
	    		} else {
	    			var type = $(this)[0].tagName.toLowerCase();
	    		}
	    		var valid = true;
	    		
	    		if ($(this).data('not-empty') == 1 && $.trim(value) == '') {
	    			valid = false;
	    		} else if (type == 'text' || type == 'textarea') {
	    			valid = settings.textValidation($(this));
	    		} else if (type == 'number') {
	    			valid = settings.numberValidation($(this));
	    		} else if (type == 'email') {
	    			valid = settings.emailValidation($(this));
	    		} else if (type == 'password') {
	    			valid = settings.passwordValidation($(this));
	    		} else if (type == 'url') {
	    			valid = settings.urlValidation($(this));
	    		} else if (type == 'select') {
	    			valid = settings.selectValidation($(this));
	    		} else if (type == 'file') {
	    			valid = settings.fileValidation($(this));
	    		} else if (type == 'tel') {
	    			valid = settings.telValidation($(this));
	    		}
	    	}
	    		
	    	settings.afterTesting(this, valid);
	    	if (!valid) validForm = false;
	    });
	    return validForm;
	};
}(jQuery));