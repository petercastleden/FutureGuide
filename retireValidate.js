$(document).ready(function() {

    	$("#investmentReturn").mask("99.9");
    	//$("#currentSavings").mask("###9.99", {reverse:true, maxlength:false});
    	$("#payment,#currentFund, #requiredIncome, #currentSavings").mask("###9",{reverse:true,maxlength:false});
    	$("#currentAge, #retirementAge, #dependantAge").mask("999");	

	$.validator.setDefaults({ignore:[]});
	$.validator.addMethod("retireAge_greater_currentAge",function(value,element){
        return     $("#retirementAge").val() > $("#currentAge").val();
     	}, "Retirement Age must be greater than Current Age");


		var $validator = $("#retireForm").validate({
		  rules: {
		    	dependantAge:{
        			required:"#incomeRelianceRadios-1:checked",
        			range:[0,120],        
      			},
      			currentFund:{
        			required:true,
        			min:0
      			},
      			currentSavings:{
        			required:true,
        			min:0
      			},
      			currentAge:{
        			required:true,
        			range:[0,120],
        			retireAge_greater_currentAge:true,
        			digits:true
      			},
      			requiredIncome:{
        			required:true,
        			min:0,
        			number:true
      			},
      			retirementAge:{
        			required:true,
        			range:[0,120],
        			retireAge_greater_currentAge:true,
        			digits:true
      			},
      			investmentReturn:{
        			required:true,
        			range:[0,50],
        			number:true
      			},
      			targetFund:{
        			required:true,
        			min:0,
        			digits:true
      			},
      
		  }
		});

	  	$('#rootwizard').bootstrapWizard({
	  		'tabClass': 'nav nav-pills',
	  		'onNext': function(tab, navigation, index) {
	  			var $valid = $("#retireForm").valid();
	  			if(!$valid) {
	  				$validator.focusInvalid();
	  				return false;
	  			}
	  		}
	  	});	

		window.prettyPrint && prettyPrint()
	});