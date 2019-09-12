# JQuery - Simple Validator for Bootstrap

A JQuery plugin that make it easy to validate forms made with Bootstrap.

## Requirements

- JQuery
- Bootstrap 3

## Usage

Simple Validator works based on HTML elements attributes. Using these attributes, you can define, for instance, the biggest number possible or the maximum length for a text in a field. You can also customize the rules for each kind of element, if you need to implement a more complex logic than the supplied one.

Simple validator only checks elements that have either `required="required"` or `data-validate="1"` attributes. The difference is that `data-validate="1"` will allow the field to be empty.

### Basic Attributes

For `input[type="text"]` or `input[type="password"]` or `textarea`:

- `minlength`: define the minimum characters for the input.
- `maxlength`: define the maximum characters for the input.

For `input[type="number"]`:

- `minlength`: define the minimum digits for the input.
- `maxlength`: define the maximum digits for the input.
- `min`: define the floor for the numeric value.
- `max`: define the ceil for the numeric value.

For `input[type="file"]`:

- `data-types`: define the allowed extensions for the file.*

*values must be comma separated, e.g.:

`<input type="file" data-types="jpg,png,gif"/>`

### Example 1 (Default behavior):

When Simple Validator runs, it looks into each form element and evaluate its validation rules. If any of the rules is not being followed, Simple Validator will add a `has-error` class to the container element. Else, Simple Validator will add a `has-success` class to the  container element. You can change this behavior as you prefer.

The following example form is set for the following rules:

- Name must contain between 3 and 32 characters. It's required.
- Email should have a valid email format. It's required.
- Site should have a valid URL format. It's not required.
- Age must be a number between 0 and 120. It's not required.

**HTML:**

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.simplevalidatorbs.min.js"></script>
 <form class="form-horizontal" novalidate="novalidate">
    <div class="form-group">
        <label for="name" class="control-label col-xs-4"><strong>Name:</strong></label>
        <div class="col-xs-8">
            <input class="form-control" id="name" type="text" minlength="3" maxlenght="32" required="required"/>
            <span class="help-block" style="display:none">Invalid name.</span>
        </div>
    </div>
    <div class="form-group">
        <label for="email" class="control-label col-xs-4"><strong>Email:</strong></label>
        <div class="col-xs-8">
            <input class="form-control" id="email" type="email" required="required"/>
            <span class="help-block" style="display:none">Invalid email.</span>
        </div>
    </div>
    <div class="form-group">
        <label for="site" class="control-label col-xs-4"><strong>Site:</strong></label>
        <div class="col-xs-8">
            <input class="form-control" id="site" type="url" data-validate="1"/>
            <span class="help-block" style="display:none">Invalid site.</span>
        </div>
    </div>
    <div class="form-group">
        <label for="age" class="control-label col-xs-4"><strong>Age:</strong></label>
        <div class="col-xs-8">
            <input class="form-control" id="age" type="number" data-validate="1" min="0" max="120"/>
            <span class="help-block" style="display:none">Invalid age.</span>
        </div>
    </div>
    <div class="form-group">
        <div class="col-xs-6">
            <button class="btn btn-block btn-default" type="button" onClick="resetForm()">Reset</button>
        </div>
        <div class="col-xs-6">
            <button class="btn btn-block btn-success" type="submit">Submit</button>
        </div>
    </div>
</form>
```

**JavaScript:**

```javascript
$(function(){
    $('form').submit(function(){;
        var valid = $(this).validateInput();
        return valid;
    });
});
```

### Example 2 (Custom behavior):

Simple Validator evaluate input types (input, textarea, select, etc) and its type attributes (text, number, email, etc) in order to decide what to do. You can pass specific functions for each of these cases. To do this, you have to pass an object ('options') containing one or more of the following arguments: textValidation, numberValidation, emailValidation, passwordValidation, urlValidation, selectValidation, fileValidation, telValidation. Each of these must be a function that returns a boolean regarding the success or failure of the validation proccess.

If you want to change the default behaviour (adding `has-success` or `has-error` class to the field container), you can pass an argument `afterTesting`, with a callback function.

**HTML:**

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.simplevalidatorbs.min.js"></script>
 <form novalidate="novalidate">
    <h3>Demo:</h3>
    <p>This is an example of a form with Simple Validator and custom options. (Try age = 3)</p>
    <div>
        <label for="name"><strong>Name:</strong></label>
        <input id="name" type="text" minlength="3" maxlenght="32" required="required"/>
        <span class="help-block" style="display:none">Invalid name.</span>
    </div>
    <div>
        <label for="email"><strong>Email:</strong></label>
        <input id="email" type="email" required="required"/>
        <span class="help-block" style="display:none">Invalid email.</span>
    </div>
    <div>
        <label for="site"><strong>Site:</strong></label>
        <input id="site" type="url" data-validate="1"/>
        <span class="help-block" style="display:none">Invalid site.</span>
    </div>
    <div>
        <label for="age"><strong>Age:</strong></label>
        <input id="age" type="number" data-validate="1"/>
        <span class="help-block" style="display:none">Invalid age.</span>
    </div>
    <button type="submit">Submit</button>
    <button onClick="reset()">Reset</button>
</form>
```

**JavaScript:**

```javascript
$(function(){
    $('form').submit(function(){
        var valid = $(this).validateInput({
            //define a custom logic for input[type="number"] fields
            'numberValidation' : function(field){
                if (parseInt($(field).val()) == 3) return false;
                return true;
            }
        });
        return valid;
    });
    resetForm = function() {
        //Check Helper Methods for resetInput()
        $('form').resetInput({
            skipSelector: '#name', 
            eachField: function($field){ console.log($field.get(0)) }
        });
    };
});
```

### Options

`afterTesting`
- **Type:** Function(Element field, Boolean valid)
- A function that handles each element after the validation, based on valid.

`textValidation`
- **Type:** Function(Element field) => Boolean
- A function that evaluates input[type="text"] elements on the form and returns true, if valid, or false, if not.

`numberValidation`
- **Type:** Function(Element field) => Boolean
A function that evaluates input[type="number"] elements on the form and returns true, if valid, or false, if not.

`emailValidation`
- **Type:** Function(Element field) => Boolean
A function that evaluates input[type="email"] elements on the form and returns true, if valid, or false, if not.

`passwordValidation`
- **Type:** Function(Element field) => Boolean
A function that evaluates input[type="password"] elements on the form and returns true, if valid, or false, if not.

`urlValidation`
- **Type:** Function(Element field) => Boolean
A function that evaluates input[type="url"] elements on the form and returns true, if valid, or false, if not.

`selectValidation`
- **Type:** Function(Element field) => Boolean
A function that evaluates select elements on the form and returns true, if valid, or false, if not.

`fileValidation`
- **Type:** Function(Element field) => Boolean
A function that evaluates input[type="file"] elements on the form and returns true, if valid, or false, if not.

`telValidation`
- **Type:** Function(Element field) => Boolean
A function that evaluates input[type="tel"] elements on the form and returns true, if valid, or false, if not.

### Helper Methods

`.resetInput({skipSelector: '', eachFieald: function($field){}})`
-  Reset all inputs in the selected form, except for `skipSelector` ones. If `eachField` is passed in the options, it will run for each field, after the values are empty (JQuery element is passed to callback).

`.hasAttr(String attrName)`
-  Returns `true` or `false` depending on the existence of an attribute on the selected element.

## About

### MIT License

*Permission is hereby granted, free of charge, to any person obtaining a copy * 
of this software and associated documentation files (the "Software"), to    
deal in the Software without restriction, including without limitation the  
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
sell copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:*                    
                                                                            
*The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.*                         
                                                                            
*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,    
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER      
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING     
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS * 
IN THE SOFTWARE.*

### Author

Ramon Kayo - <contato@ramonk.com>
