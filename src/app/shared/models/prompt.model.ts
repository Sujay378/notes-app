export class ModalParams {
  public showCloseIcon?: boolean = true;
  public backDropEnabled: boolean = false;
  public showPrimaryButton: boolean = true;
  public showSecondaryButton: boolean = false;
  public headerText?: string;
  public bodyText?: string;
  public primaryButtonText?: string = '';
  public secondaryButtonText?: string = '';
  public primaryCallback?: (event?: any) => void;
  public secondaryCallbck?: (event?: any) => void;

  constructor(config: ModalParams) {
    Object.keys(config).forEach((key) => (this[key] = config[key]));
  }
}

export interface ModalConfig {
  type: string;
  params: ModalParams;
}
