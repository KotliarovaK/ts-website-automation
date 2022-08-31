import { sleep } from 'k6';
import { getBack, getBuildId, getToAboutUs, getToCareer, getToContactUs, getToReviews, getToWebsite } from '../steps/career-steps.js';

export let options = {
	insecureSkipTLSVerify: true,
	noConnectionReuse: false,
	vus: 500,
	duration: '10s'
};

export function setup() {
	const buildId = getBuildId();
	return { buildId: buildId }
  }

export default function (data) {
	getToWebsite();

	getToCareer('back-end-engineer-new-v6', 'Back-End Engineer new', data.buildId);
	getBack(data.buildId);

	getToCareer('ios-software-developers-v10', 'iOS Software Developer', data.buildId);

	getToContactUs(data.buildId);

	getToAboutUs(data.buildId);

	getToReviews(data.buildId);

	sleep(1);
};