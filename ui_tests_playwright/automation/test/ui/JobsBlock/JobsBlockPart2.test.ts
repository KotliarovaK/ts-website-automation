import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import ContainerByClass from '../../../components/container/ContainerByClass';
import Containers from '../../../identifiers/Containers';
import Link from '../../../identifiers/Link';
import Button from '../../../identifiers/Button';
import {driver} from '../../../base/driver/Driver';
import { containerSteps } from '../../../steps/components/container/ContainerSteps';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that user can switch language in navigation header in career page @Regression @JobsBlock @TSWEB-146', async () => {
	const jobPageHeaderContainer = await containerSteps.getContainer(ContainerByClass, Containers.jobPageHeaderWrapper);
	const logoHeader = jobPageHeaderContainer.Element.getByTestId(Link.Logo);

	// A footer element creates to navigate to it and to  appearing a navigation panel 
	const footerContainer = await containerSteps.getContainer(ContainerByClass, Containers.footerWrapper);
	const logoFooter = footerContainer.Element.getByTestId(Link.Logo);
	logoFooter.focus();

	await logoHeader.waitFor({state: 'visible'});
	await expect(driver.getByTestId(Button.NavigationTab_Jobs)).toHaveText('Jobs');
	await expect(driver.getByTestId(Button.NavigationTab_AboutUs)).toHaveText('About us');
	await expect(driver.getByTestId(Button.NavigationTab_Reviews)).toHaveText('Reviews');
	await expect(driver.getByTestId(Button.NavigationTab_ContactUs)).toHaveText('Contact us');

	await expect(jobPageHeaderContainer.Element.getByTestId(Button.EnLanguageSwitcher)).toHaveClass(/active-locale/);

	const uaButtonSwitcher = jobPageHeaderContainer.Element.getByTestId(Button.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
