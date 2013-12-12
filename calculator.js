jQuery(document).ready(function () {

	
jQuery('#calculateButton').click(function () {
      if($('#retireForm').valid()) {
        $('#calculateButton').prop('disabled', true);
        $('#calculateButton').text('Calculating...');
        jQuery('#monthlyPayment').val(Math.round(result() * 100) / 100);
        jQuery('#projIncome').val(Math.round(result2()*100)/100);
        $('#calculateButton').prop('disabled', false);
        $('#calculateButton').text('Calculate');
        return false;
      }
      else{
      return alert("One or more of your inputs is not valid");
      }});
});


      //var isMale = jQuery('#genderRadios-0').is(':checked');
      //var isJointLife = jQuery('#incomeRelianceRadios-1').is(':checked');    
      var currentAge = parseInt(jQuery('#currentAge').val());
      //var dependantAge = parseInt(jQuery('#dependantAge').val());
      var retirementAge = parseInt(jQuery('#retirementAge').val());
      //var currentFund = parseFloat(jQuery('#currentFund').val());
      //var currentSavings = parseFloat(jQuery('#currentSavings').val());
      //var requiredIncome = parseFloat(jQuery('#requiredIncome').val());
      //var targetFund = parseFloat(jQuery('#targetFund').val());
      //var investmentReturn = parseFloat(jQuery('#investmentReturn').val() / 100);
      var term = retirementAge - currentAge;



// Work out the Age to use in the Annuity Calculation
var usedAnnuityAge = new annuityAge({
      isJointLife: jQuery('#incomeRelianceRadios-1').is(':checked'),    
      currentAge: parseInt(jQuery('#currentAge').val()),
      dependantAge: parseInt(jQuery('#dependantAge').val()),
      retirementAge: parseInt(jQuery('#retirementAge').val())
});




//Duration must be in 5 year bands, with a maximum of 50, so this function achieves this.
var usedDuration = Math.min(Math.floor(term/5)*5,50);

console.log(usedAnnuityAge.tempAnnuityAge());
console.log(usedDuration);
    
//  function targetAnnuity(isJointLife,age,isMale,term){
//    if (this.isJointLife && true){
//    return this.myAnnuities.mortalityRates({Age: age, Gender: "Joint", Duration:term}).first().Factor;
//    }
//    else{
//      return this.myAnnuities.mortalityRates({Age:age, Gender:(isMale?'Male':'Female'), Duration:term}).first().Factor;
//}
//  }


//calculate the Annuity Factor used at Retirement Date
var usedAnnuityFactor = new targetAnnuity({
    isJointLife: jQuery('#incomeRelianceRadios-1').is(':checked'),
    isMale: jQuery('#genderRadios-0').is(':checked'),
    annuityAge: usedAnnuityAge.tempAnnuityAge(),
    usedDuration: usedDuration,
    assumptions:  myAnnuities
});

//var annuityFactor = targetAnnuity(isJointLife,usedAnnuityAge.tempAnnuityAge(),isMale,usedDuration);
console.log(usedAnnuityFactor.annuityFactor());

//work out the amount of money needed at retirement to achieve goal
//add selection for monthly or annual payment
var targetFundEnd = parseFloat(jQuery('#requiredIncome').val()*12/(usedAnnuityFactor.annuityFactor()));
console.log(targetFundEnd);

//calculate the savings Gap
var savings = new savingGap({
  targetFund: parseFloat(targetFundEnd),
  currentFund: parseFloat(jQuery('#currentFund').val()),
  currentAge: parseInt(jQuery('#currentAge').val()),
  retirementAge: parseInt(jQuery('#retirementAge').val()),
  investmentReturn: parseFloat(jQuery('#investmentReturn').val() / 100)
});


console.log(savings.RequiredSavings());

//calculate the projected fund at current savings levels
var futureFund = new projectedFund({
  currentSavings:parseFloat(jQuery('#currentSavings').val()),
  currentFund:parseFloat(jQuery('#currentFund').val()),
  currentAge:parseInt(jQuery('#currentAge').val()),
  retirementAge:parseInt(jQuery('#retirementAge').val()),
  investmentReturn: parseFloat(jQuery('#investmentReturn').val() / 100)
  
});
console.log(futureFund.currentFutureFund());

//how much income will existing savings purchase
var projectedIncome = futureFund.currentFutureFund()*usedAnnuityFactor.annuityFactor()/12;
console.log(projectedIncome);	


function result(){
  var usedAnnuityAge = new annuityAge({
      isJointLife: jQuery('#incomeRelianceRadios-1').is(':checked'),    
      currentAge: parseInt(jQuery('#currentAge').val()),
      dependantAge: parseInt(jQuery('#dependantAge').val()),
      retirementAge: parseInt(jQuery('#retirementAge').val())
});

  var usedDuration = Math.min(Math.floor((parseInt(jQuery('#retirementAge').val()) - parseInt(jQuery('#currentAge').val()))/5)*5,50);

  var usedAnnuityFactor = new targetAnnuity({
    isJointLife: jQuery('#incomeRelianceRadios-1').is(':checked'),
    isMale: jQuery('#genderRadios-0').is(':checked'),
    annuityAge: usedAnnuityAge.tempAnnuityAge(),
    usedDuration: usedDuration,
    assumptions:  myAnnuities
});

  var targetFundEnd = parseFloat(jQuery('#requiredIncome').val()*12/(usedAnnuityFactor.annuityFactor()));

  var savings = new savingGap({
    targetFund: parseFloat(targetFundEnd),
    currentFund: parseFloat(jQuery('#currentFund').val()),
    currentAge: parseInt(jQuery('#currentAge').val()),
    retirementAge: parseInt(jQuery('#retirementAge').val()),
    investmentReturn: parseFloat(jQuery('#investmentReturn').val() / 100)
  });
 return savings.RequiredSavings();
}
//console.log(result());

function result2(){
  var usedAnnuityAge = new annuityAge({
      isJointLife: jQuery('#incomeRelianceRadios-1').is(':checked'),    
      currentAge: parseInt(jQuery('#currentAge').val()),
      dependantAge: parseInt(jQuery('#dependantAge').val()),
      retirementAge: parseInt(jQuery('#retirementAge').val())
});

  var usedDuration = Math.min(Math.floor((parseInt(jQuery('#retirementAge').val()) - parseInt(jQuery('#currentAge').val()))/5)*5,50);

  var usedAnnuityFactor = new targetAnnuity({
    isJointLife: jQuery('#incomeRelianceRadios-1').is(':checked'),
    isMale: jQuery('#genderRadios-0').is(':checked'),
    annuityAge: usedAnnuityAge.tempAnnuityAge(),
    usedDuration: usedDuration,
    assumptions:  myAnnuities
});

  var futureFund = new projectedFund({
    currentSavings:parseFloat(jQuery('#currentSavings').val()),
    currentFund:parseFloat(jQuery('#currentFund').val()),
    currentAge:parseInt(jQuery('#currentAge').val()),
    retirementAge:parseInt(jQuery('#retirementAge').val()),
    investmentReturn: parseFloat(jQuery('#investmentReturn').val() / 100)
  
});

  var projectedIncome = futureFund.currentFutureFund()*usedAnnuityFactor.annuityFactor()/12;

  return projectedIncome;
}







//function solveFunction(monthlyPayment) {
//  var model = new ProjectionModel({
//      assumptions: MyAssumptions,
//      isMale: jQuery('#genderRadios-0').is(':checked'),
//      isJointLife: jQuery('#incomeRelianceRadios-1').is(':checked'),    
//      currentAge: parseInt(jQuery('#currentAge').val()),
//      dependantAge: parseInt(jQuery('#dependantAge').val()),
//      retirementAge: parseInt(jQuery('#retirementAge').val()),
//      currentFund: parseFloat(jQuery('#currentFund').val()),
//      currentSavings: parseFloat(jQuery('#currentSavings').val()),
//      requiredIncome: parseFloat(jQuery('#requiredIncome').val()),
//      targetFund: parseFloat(jQuery('#targetFund').val()),
//      investmentReturn: parseFloat(jQuery('#investmentReturn').val() / 100),
//      monthlyPayment: monthlyPayment
//  });

    

//  return model.ProjectedFund() - jQuery('#targetFund').val();
//}
