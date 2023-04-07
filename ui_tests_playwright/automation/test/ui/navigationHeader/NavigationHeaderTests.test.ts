import {expect, test} from '@playwright/test';
import {baseDriverSteps} from '../../../base/step/BaseDriverSteps';
import UrlProvider from '../../../providers/UrlProvider';
import {containerSteps} from '../../../steps/components/container/ContainerSteps';
import ContainerByClass from '../../../components/container/ContainerByClass';
import Containers from '../../../identifiers/Containers';
import Button from '../../../identifiers/Button';
import {driver} from '../../../base/driver/Driver';

test.beforeEach(async () => {
	await baseDriverSteps.createsNewBrowserAndGoToUrl(UrlProvider.careerUrl());
});

test('Check that user can switch language in navigation header @Regression @NavigationHeader @TSWEB-560', async () => {
	const headerContainer = await containerSteps.getContainer(ContainerByClass, Containers.navigationHeaderClass);
	const uaButtonSwitcher = headerContainer.Element.getByTestId(Button.UaLanguageSwitcher);
	await uaButtonSwitcher.click();
	await expect(uaButtonSwitcher).toHaveClass(/active-locale/);
});

test.afterEach(async () => {
	await driver.closeDrivers();
});
