import {Locator, Page} from '@playwright/test';
import BaseComponent from '../../base/component/BaseComponent';

export default class ContainerById extends BaseComponent {
	public get sectionNumber() {
		return this.Element.locator("//div[contains(@class, 'SectionNumber')]");
	}

	public get title() {
		return this.Element.locator("//div[contains(@class, 'title')]");
	}

	public get section_title() {
		return this.Element.locator("//div[contains(@class, 'section-title')]");
	}

	public get block_title() {
		return this.Element.locator("//div[contains(@class,'block-title')]");
	}

	constructor(page: Page, identifier: string, parent?: Locator) {
		super(page, identifier, parent);
		this.ComponentContext = `//*[@id="${identifier}" or @data-id="${identifier}"]`;
	}
}
