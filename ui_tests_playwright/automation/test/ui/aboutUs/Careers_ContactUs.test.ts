import {test, expect} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import Button from '../../../identifiers/Button';
import Input from '../../../identifiers/Input';
import UrlProvider from '../../../providers/UrlProvider';
import ContactUs from '../../../identifiers/Forms/ContactUsForm';
import Navigation from '../../../identifiers/Navigation';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
	await driver.getByTestId(Navigation.NavigationTab_ContactUs).click();
});

test("Check that 'Full Name' input field does not accept only spaces in the 'Contact Us' form @Regression @ContactUs @TSWEB-76", async () => {
	const testData: Array<string> = [
		' ',
		' '.repeat(149), // Field accepts up to 149 characters
	];

	for (const data of testData) {
		await driver.getByTestId(ContactUs.FullName).fill(data);
		await driver.getByTestId(Button.SendButton).click();
		const actualErrorText_FullName = driver.getByTestId(ContactUs.FullName).locator(Input.fieldErrorSelector);

		await expect(actualErrorText_FullName).toHaveText('Please enter your name');
	}
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
