var savingGap = function (options) {
    this.targetFund = options.targetFund;
    this.currentFund = options.currentFund;
    this.currentAge = options.currentAge;
    this.retirementAge = options.retirementAge;
    this.investmentReturn = options.investmentReturn;
    this.term = this.retirementAge - this.currentAge;
    this.monthlyInvestmentReturn = Math.pow(1+this.investmentReturn,1/12)-1;
};

savingGap.prototype.RequiredSavings = function(){
    var requiredSavings = this.currentSavings;
    var pvTargetFund = this.targetFund * Math.pow(1+this.monthlyInvestmentReturn,this.term*-12);    
    if (this.currentFund>=pvTargetFund){
        requiredSavings = 0;
    } 
    else{
    var fundGap = pvTargetFund - this.currentFund;
    var pvLevelAnnuityDue = (1 - Math.pow(1+this.monthlyInvestmentReturn, this.term*-12))/(this.monthlyInvestmentReturn)*(1+this.monthlyInvestmentReturn);
    requiredSavings = fundGap/pvLevelAnnuityDue;
    }
    return requiredSavings;
};


