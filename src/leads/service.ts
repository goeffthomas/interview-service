import { LEADS } from './mock-db';
import { ILeadSubmission } from './interfaces';

export const dump = () => LEADS;

/**
 * Sample submissions:
 *  - GET localhost:3004/leads/search?firstName=Walter
 *  - GET localhost:3004/leads/search?industry=Engineering
 *  - GET localhost:3004/leads/search?debt=0
 */
export const query = (query: any) => {
    const {
        createdOn,
        modifiedOn,
        firstName,
        lastName,
        email,
        companyName,
        industry,
    } = query;

    // Convert string query params to numbers
    const debt = Number(query.debt);
    const annualIncome = Number(query.annualIncome);

    // Filtering here is expected to operate in an OR capacity, so if anyone search term matches, the record should be returned
    return LEADS.filter(l =>
        (createdOn && new Date(createdOn).getTime() === new Date(l.createdOn).getTime())
        || (modifiedOn && new Date(modifiedOn).getTime() === new Date(l.modifiedOn).getTime())
        || (firstName && firstName === l.firstName)
        || (lastName && lastName === l.lastName)
        || (email && email === l.email)
        || (companyName && companyName === l.companyName)
        || (annualIncome && annualIncome === l.annualIncome)
        || (debt && debt === l.debt)
        || (industry && industry === l.industry)
    );
};

/**
 * The method handles deduplication of submissions based on the email of the Lead(s)
 * @param newLeads Array of Lead submissions
 * @returns Array of merged Leads that were inserted into the DB
 * 
 * POST localhost:3004/leads
 * Sample payloads in ./mock-db.ts
 */
export const insert = (newLeads: ILeadSubmission[]) => {
    // Deny entire transaction if any Leads are already in DB by email
    if (LEADS.some(dbLead => newLeads.some(newLead => newLead.email === dbLead.email))) {
        throw new RangeError('Duplicate Lead detected--insertion of Leads denied');
    }

    // Perform deduplication logic
    const mergedLeads: ILeadSubmission[] = [];
    for (const newLead of newLeads) {
        const preexisting = mergedLeads.find(mergedLead => mergedLead.email === newLead.email);
        // No duplicate, so simply add to Leads needing insertion
        if (!preexisting) {
            mergedLeads.push(newLead);
        } else {
            // Duplicate detected in submission data--Use latest submission data
            if (new Date(preexisting.submittedOn).getTime() < new Date(newLead.submittedOn).getTime()) {
                preexisting.firstName = newLead.firstName;
                preexisting.lastName = newLead.lastName;
                preexisting.email = newLead.email;
                preexisting.companyName = newLead.companyName;
                preexisting.annualIncome = newLead.annualIncome;
                preexisting.debt = newLead.debt;
                preexisting.industry = newLead.industry;
                preexisting.submittedOn = newLead.submittedOn;
            }
        }
    }

    const now = new Date();
    const month = now.getMonth() + 1; // JS months are 0-based
    const date = now.getDate();
    const today = `${now.getFullYear()}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
    for (const mergedLead of mergedLeads) {
        delete mergedLead.submittedOn; // Property doesn't exist on ILeadRecord(s)
        LEADS.push({
            createdOn: today,
            modifiedOn: today,
            ...mergedLead,
        });
    }
    return mergedLeads;
};
