import { element, by, ElementFinder } from 'protractor';

export class JoueurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-joueur div table .btn-danger'));
  title = element.all(by.css('jhi-joueur div h2#page-heading span')).first();

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

export class JoueurUpdatePage {
  pageTitle = element(by.id('jhi-joueur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  prenomInput = element(by.id('field_prenom'));
  nomInput = element(by.id('field_nom'));
  loginInput = element(by.id('field_login'));
  reservationSelect = element(by.id('field_reservation'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPrenomInput(prenom: string): Promise<void> {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput(): Promise<string> {
    return await this.prenomInput.getAttribute('value');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setLoginInput(login: string): Promise<void> {
    await this.loginInput.sendKeys(login);
  }

  async getLoginInput(): Promise<string> {
    return await this.loginInput.getAttribute('value');
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

export class JoueurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-joueur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-joueur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
