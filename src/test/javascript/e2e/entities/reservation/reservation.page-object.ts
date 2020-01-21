import { element, by, ElementFinder } from 'protractor';

export class ReservationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-reservation div table .btn-danger'));
  title = element.all(by.css('jhi-reservation div h2#page-heading span')).first();

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

export class ReservationUpdatePage {
  pageTitle = element(by.id('jhi-reservation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  courtSelect = element(by.id('field_court'));
  joueurSelect = element(by.id('field_joueur'));
  horaireSelect = element(by.id('field_horaire'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async courtSelectLastOption(): Promise<void> {
    await this.courtSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courtSelectOption(option: string): Promise<void> {
    await this.courtSelect.sendKeys(option);
  }

  getCourtSelect(): ElementFinder {
    return this.courtSelect;
  }

  async getCourtSelectedOption(): Promise<string> {
    return await this.courtSelect.element(by.css('option:checked')).getText();
  }

  async joueurSelectLastOption(): Promise<void> {
    await this.joueurSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async joueurSelectOption(option: string): Promise<void> {
    await this.joueurSelect.sendKeys(option);
  }

  getJoueurSelect(): ElementFinder {
    return this.joueurSelect;
  }

  async getJoueurSelectedOption(): Promise<string> {
    return await this.joueurSelect.element(by.css('option:checked')).getText();
  }

  async horaireSelectLastOption(): Promise<void> {
    await this.horaireSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async horaireSelectOption(option: string): Promise<void> {
    await this.horaireSelect.sendKeys(option);
  }

  getHoraireSelect(): ElementFinder {
    return this.horaireSelect;
  }

  async getHoraireSelectedOption(): Promise<string> {
    return await this.horaireSelect.element(by.css('option:checked')).getText();
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

export class ReservationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-reservation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-reservation'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
