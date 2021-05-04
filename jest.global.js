/**
 * @note Mocks for commonly used/shared dependencies can be placed here to prevent errant callouts
 * (e.g. HTTP clients, event publishers, etc.)
 * Default implementation can be provided, with specific implementation determined per test, as needed
 */

const { Rates } = require('./src/swap-rates/models/swap-rates');
const { Selections } = require('./src/selections/models/selections');
const { Grading } = require('./src/grading/models/grading');
const { Pricing } = require('./src/pricing/models/pricing');

const { DEFAULT_SWAP_RATES, DEFAULT_GRADES } = require('./src/grading/__fixtures__');
const { DEFAULT_PRICING_DOCUMENT } = require('./src/pricing/__fixtures__');
const { fakeSelectionDoc } = require('./src/selections/__fixtures__');

jest.useFakeTimers();
jest.mock('request-promise');
jest.mock('@currency/logger-server');
jest.mock('@currency/event-grid-publisher');

jest.mock('./src/common/logger', () => ({
	logger: { trace: jest.fn(), error: jest.fn(), userEvent: jest.fn() },
	SeverityLevel: {},
}));
jest.mock('./src/feature-flags', () => ({
	client: {
		readyState: true,
		getFlag: jest.fn().mockResolvedValue(true),
	},
}));

jest.spyOn(Rates, 'count').mockResolvedValue(null);
jest.spyOn(Rates, 'findOne').mockReturnValue({
	sort: () => {
		return {
			exec: jest.fn().mockResolvedValue(DEFAULT_SWAP_RATES),
		};
	},
});
jest.spyOn(Selections, 'findOne').mockResolvedValue({ ...fakeSelectionDoc });
jest.spyOn(Selections, 'create').mockImplementation((newDoc) => Promise.resolve(newDoc));
jest.spyOn(Grading.prototype, 'save').mockResolvedValue({});
jest.spyOn(Grading, 'findOne').mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });
jest.spyOn(Grading, 'find').mockReturnValue({
	sort: () => {
		return {
			exec: jest.fn().mockResolvedValue(DEFAULT_GRADES),
		};
	},
});
jest.spyOn(Pricing.prototype, 'save').mockResolvedValue(DEFAULT_PRICING_DOCUMENT);
jest.spyOn(Pricing, 'find').mockResolvedValue([DEFAULT_PRICING_DOCUMENT]);
