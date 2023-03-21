import {expect, Locator} from '@playwright/test';
import {driver} from '../../../base/driver/Driver';
import ContainerById from '../../../components/Container/ContainerById';

class ContainerSteps {
	public async getContainer(type: any, identifier: string) {
		return await driver.component(type, identifier);
	}

	public async clickContainer(
		type: any,
		identifier: string,
		times: number = 1,
		parent?: Locator
	) {
		await (
			await driver.component(type, identifier, parent)
		).click({clickCount: times, delay: 50});
	}

	public async isEnabled(type: any, identifier: string, parent?: Locator) {
		await (await driver.component(type, identifier, parent)).isEnabled();
	}

	public async isDisabled(type: any, identifier: string, parent?: Locator) {
		await (await driver.component(type, identifier, parent)).isDisabled();
	}

	public async checkContainerBlockTitle(
		identifier: string,
		expectedTitle: string,
		parent?: Locator
	) {
		let title = await (
			await driver.component(ContainerById, identifier, parent)
		).block_title;
		await expect(title).toHaveText(expectedTitle);
	}

	public async checkContainerText(
		identifier: string,
		expectedTitle: string,
		parent?: Locator
	) {
		let text = await (
			await driver.component(ContainerById, identifier, parent)
		).textContent();
		await expect(text).toContain(expectedTitle);
	}
}

var containerSteps = new ContainerSteps();

export {containerSteps};
