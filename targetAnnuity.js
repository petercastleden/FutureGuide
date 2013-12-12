var targetAnnuity = function (options) {
    this.isJointLife = options.isJointLife && true;
    this.annuityAge = options.annuityAge;
    this.usedDuration = options.usedDuration;
    this.isMale = options.isMale && true;
    this.assumptions = options.assumptions;
};

targetAnnuity.prototype.annuityFactor = function () {
    var annuityFactor = 1;
    var gender = "Male";
    if (this.isMale && true) {
        gender = "Male";
    } else {
        gender = "Female";
    }
    if (this.isJointLife && true) {
        annuityFactor = this.assumptions.mortalityRates({
            Age: this.annuityAge,
            Gender: "Joint",
            Duration: this.usedDuration
        }).first().Factor;
    } else {
        annuityFactor = this.assumptions.mortalityRates({
            Age: this.annuityAge,
            Gender: gender,
            Duration: this.usedDuration
        }).first().Factor;
    }
    return annuityFactor;
};