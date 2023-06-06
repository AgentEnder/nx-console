import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume, ContextConsumer } from '@lit-labs/context';
import { editorContext } from '../editor-context';

@customElement('button-element')
export class Button extends LitElement {
  @property()
  text: string;

  editor: string;

  constructor() {
    super();
    new ContextConsumer(this, {
      context: editorContext,
      callback: (value) => {
        this.editor = value;
      },
      subscribe: false,
    });
  }

  render() {
    return this.editor === 'vscode'
      ? this.renderVSCode()
      : this.renderIntellij();
  }

  renderVSCode() {
    return html`<vscode-button appearance="primary"
      >${this.text}</vscode-button
    >`;
  }

  renderIntellij() {
    return html`<button class="bg-primary py-1 px-4 rounded-md">
      ${this.text}
    </button>`;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}