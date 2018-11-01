import { LitElement, html } from '@polymer/lit-element';
import { library, icon, dom } from '@fortawesome/fontawesome-svg-core';

export default class extends LitElement {
  constructor() {
    super();
    this.prefix = 'fas';
    this.size = '1x';
    this.fixedWidth = false;
    this.border = false;
    this.pullLeft = false;
    this.pullRight = false;
    this.spin = false;
    this.pulse = false;
    this.scale = 100;
    this.rotate = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.flipX = false;
    this.flipY = false;
  }

  static get properties() {
    return {
      prefix: {
        type: String,
      },
      iconName: {
        type: String,
      },
      size: {
        type: String,
      },
      fixedWidth: {
        type: Boolean,
      },
      border: {
        type: Boolean,
      },
      pullLeft: {
        type: Boolean,
      },
      pullRight: {
        type: Boolean,
      },
      spin: {
        type: Boolean,
      },
      pulse: {
        type: Boolean,
      },
      scale: {
        type: Number,
      },
      rotate: {
        type: Number,
      },
      translateX: {
        type: Number,
      },
      translateY: {
        type: Number,
      },
      flipX: {
        type: Boolean,
      },
      flipY: {
        type: Boolean,
      },
      maskPrefix: {
        type: String,
      },
      maskName: {
        type: String,
      },
    };
  }

  async lazyLoading(fa) {
    let icons;
    switch (fa) {
      case 'far':
        icons = await import('@fortawesome/free-regular-svg-icons/index.es').then(
          ({ far, prefix, ...listIcons }) => listIcons,
        );
        break;
      case 'fab':
        icons = await import('@fortawesome/free-brands-svg-icons/index.es').then(
          ({ fab, prefix, ...listIcons }) => listIcons,
        );
        break;
      case 'fas':
        icons = await import('@fortawesome/free-solid-svg-icons/index.es').then(
          ({ fas, prefix, ...listIcons }) => listIcons,
        );
        break;
      default:
        icons = await import('@fortawesome/free-solid-svg-icons/index.es').then(
          ({ fas, prefix, ...listIcons }) => listIcons,
        );
    }
    library.add(icons);
  }

  async renderIcon() {
    const {
      prefix,
      iconName,
      maskName,
      maskPrefix,
      transform,
      classes,
      lazyLoading,
    } = this;
    await lazyLoading(prefix);

    if (maskName) {
      await lazyLoading(maskPrefix);
    }

    return html(
      icon(
        {
          prefix,
          iconName,
        },
        {
          transform,
          classes,
          mask: {
            prefix: maskPrefix,
            iconName: maskName,
          },
        },
      ).html,
    );
  }

  get transform() {
    const { scale, rotate, translateX, translateY, flipX, flipY } = this;
    return {
      size: (16 * scale) / 100,
      rotate,
      x: translateX,
      y: translateY,
      flipX,
      flipY,
    };
  }

  get classes() {
    const { fixedWidth, pullLeft, pullRight, border, spin, pulse, size } = this;
    return [
      [fixedWidth, 'fa-fw'],
      [pullLeft, 'fa-pull-left'],
      [pullRight, 'fa-pull-right'],
      [border, 'fa-border'],
      [spin, 'fa-spin'],
      [pulse, 'fa-pulse'],
      [
        [
          'xs',
          'sm',
          'lg',
          '2x',
          '3x',
          '4x',
          '5x',
          '6x',
          '7x',
          '8x',
          '9x',
          '10x',
        ].includes(size),
        `fa-${size}`,
      ],
    ].map(([condition, _class]) => (condition ? _class : null));
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-block;
        }

        svg {
          color: var(--icon-color, black);
          background-color: var(--icon-background-color, white);
        }
      ${dom.css()}
      </style>
      ${this.renderIcon()}`;
  }
}
