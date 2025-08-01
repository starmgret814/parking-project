import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <div
      style="display: flex; justify-content: center; align-items: center; width: 100%; padding: 0; margin: 0;"
    >
      <a
        href="/"
        class="logodark"
        style="display: flex; justify-content: center; align-items: center;"
      >
        <img
          src="./assets/images/logos/dark-logo.svg"
          alt="logo"
          style="margin: 0; padding: 0; display: block; max-width: 100%; height: auto;"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}
