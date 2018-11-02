import { LitElement, html } from '@polymer/lit-element'
import { icon, dom, parse } from '@fortawesome/fontawesome-svg-core'

export default class extends LitElement {
  constructor() {
    super()
    this.border = false
    this.className = ''
    this.mask = null
    this.fixedWidth = false
    this.inverse = false
    this.flip = null
    this.icon = null
    this.listItem = false
    this.pull = null
    this.pulse = false
    this.rotation = null
    this.size = null
    this.spin = false
    this.symbol = false
    this.title = ''
    this.transform = null
  }

  static get properties() {
    return {
      border: {
        type: Boolean
      },

      className: {
        type: String
      },

      mask: {
        type: value => {
          if (typeof value === 'object' && value.prefix && value.iconName) {
            return value
          }
          if (Array.isArray(value) && value.length === 2) {
            const [prefix, iconName] = value
            return { prefix, iconName }
          }
          if (typeof value === 'string') {
            return { prefix: 'fas', iconName: value }
          }
          return null
        }
      },

      fixedWidth: {
        type: Boolean
      },

      inverse: {
        type: String
      },

      flip: {
        type: String
      },

      icon: {
        type: value => {
          if (typeof value === 'object' && value.prefix && value.iconName) {
            return value
          }
          if (Array.isArray(value) && value.length === 2) {
            const [prefix, iconName] = value
            return { prefix, iconName }
          }
          if (typeof value === 'string') {
            return { prefix: 'fas', iconName: value }
          }
          return null
        }
      },

      listItem: {
        type: Boolean
      },

      pull: {
        type: String
      },

      pulse: {
        type: Boolean
      },

      rotation: {
        type: Number
      },

      size: {
        type: String
      },

      spin: {
        type: Boolean
      },

      symbol: {},

      title: {
        type: String
      },

      transform: {}
    }
  }

  get classList() {
    const {
      spin,
      pulse,
      fixedWidth,
      inverse,
      border,
      listItem,
      flip,
      size,
      rotation,
      pull
    } = this
    const classes = {
      'fa-spin': spin,
      'fa-pulse': pulse,
      'fa-fw': fixedWidth,
      'fa-inverse': inverse,
      'fa-border': border,
      'fa-li': listItem,
      'fa-flip-horizontal': flip === 'horizontal' || flip === 'both',
      'fa-flip-vertical': flip === 'vertical' || flip === 'both',
      [`fa-${size}`]: size !== null,
      [`fa-rotate-${rotation}`]: rotation !== null,
      [`fa-pull-${pull}`]: pull !== null
    }

    return Object.keys(classes)
      .map(key => (classes[key] ? key : null))
      .filter(key => key)
  }

  FontAwesomeIcon() {
    const {
      icon: iconLookup,
      mask,
      symbol,
      className,
      title,
      classList,
      transform
    } = this
    const renderedIcon = icon(iconLookup, {
      classes: [...classList, ...className.split(' ')],
      transform: typeof transform === 'string' ? parse.transform(transform) : transform,
      mask,
      symbol,
      title
    })

    if (!renderedIcon) {
      console.error('Could not find icon', iconLookup)
      return null
    }

    return html(renderedIcon.html)
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
      ${this.FontAwesomeIcon()}`
  }
}
