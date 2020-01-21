import { element, by, ElementFinder } from 'protractor';

export class CourtComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-court div table .btn-danger'));
  title = element.all(by.css('jhi-court div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CourtUpdatePage {
  pageTitle = element(by.id('jhi-court-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  numeroSelect = element(by.id('field_numero'));
  reservationSelect = element(by.id('field_reservation'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroSelect(numero: string): Promise<void> {
    await this.numeroSelect.sendKeys(numero);
  }

  async getNumeroSelect(): Promise<string> {
    return await this.numeroSelect.element(by.css('option:checked')).getText();
  }

  async numeroSelectLastOption(): Promise<void> {
    await this.numeroSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async reservationSelectLastOption(): Promise<void> {
    await this.reservationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async reservationSelectOption(option: string): Promise<void> {
    await this.reservationSelect.sendKeys(option);
  }

  getReservationSelect(): ElementFinder {
    return this.reservationSelect;
  }

  async getReservationSelectedOption(): Promise<string> {
    return await this.reservationSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CourtDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-court-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-court'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
