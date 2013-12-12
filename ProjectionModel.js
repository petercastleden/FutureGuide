var ProjectionModel = function (options) {
    this.assumptions = options.assumptions;
    this.isMale = options.isMale && true;
    this.isJointLife = options.isJointLife && true;
    this.monthlyPayment = options.monthlyPayment; 
    this.currentFund = options.currentFund || 0; 
    this.requiredIncome = options.requiredIncome;
    this.goalFund = options.goalFund; 
    this.currentAge = options.currentAge; 
    this.currentSavings = options.currentSavings;
    this.dependantAge = options.dependantAge;
    this.retirementAge = options.retirementAge || 65; 
    this.investmentReturn = options.investmentReturn || 0.1;
    this.monthlyInvestmentReturn = Math.pow(1 + this.investmentReturn, 1/12) - 1;
    this.term = this.retirementAge - this.currentAge;
};

ProjectionModel.prototype.ProjectedFund = function () {
    var projectedFund = this.currentFund;
    for (i = 1; i < this.term * 12 + 1; i++) {
        var px = 1 - this.assumptions.mortalityRates({Age: Math.floor(this.currentAge + i/12), Sex: (this.isMale?'M':'F')}).first().Value;
        projectedFund = (projectedFund + this.monthlyPayment) * (1 + this.monthlyInvestmentReturn) * Math.pow(px, 1/12);
    }
    return projectedFund;
};
