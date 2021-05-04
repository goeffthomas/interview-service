interface ILead {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    annualIncome: number;
    debt: number;
    industry: string;
}

export interface ILeadRecord extends ILead {
    createdOn: string;
    modifiedOn: string;
}

export interface ILeadSubmission extends ILead {
    submittedOn: string;
}
