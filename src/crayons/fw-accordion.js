class FWAccordion extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    this.heading = this.getAttribute('heading')
    template.innerHTML = `
<style>
summary {
  padding: .5em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

summary:hover {
background-color: white;
}

.details-container {
padding: 0.5em;
}
</style>
<details>
<summary>${this.heading}</summary>
<div class="details-container">
<slot></slot>
</div>

`
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('fw-accordion', FWAccordion)
