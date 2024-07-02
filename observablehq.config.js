// https://observablehq.com/framework/config
export default {
  title: "Filecoin Metrics",
  root: "src",
  theme: ["glacier", "dashboard"],
  head: '<link rel="icon" href="logo.svg" type="image/svg" sizes="32x32">',
  header: `<style>

  #observablehq-header .logo {
    height: 2rem;
    width: auto;
  }

  #observablehq-header a[href] {
    color: inherit;
  }

  #observablehq-header a[target="_blank"] {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;
  }

  #observablehq-header a[target="_blank"]:hover span {
    text-decoration: underline;
  }

  #observablehq-header a[target="_blank"]:not(:hover, :focus)::after {
    color: var(--theme-foreground-muted);
  }

  @container not (min-width: 640px) {
    .hide-if-small {
      display: none;
    }
  }

  </style>
  <div style="display: flex; align-items: center; height: 2.2rem; margin: -1.5rem -2rem 2rem -2rem; padding: 0.5rem 2rem; border-bottom: solid 1px var(--theme-foreground-faintest); font: 400 16px var(--sans-serif);">
    <div style="display: flex; flex-grow: 1; justify-content: space-between; align-items: center;">
      <b>
        <a href="" target="_self" rel="">
          Filecoin Metrics
        </a>
      </b>
      <b>
        <a href="/storage-providers">
          Storage Providers
        </a>
      </b>
      <b>
        <a href="/clients">
          Clients
        </a>
      </b>
      <b>
        <a href="/allocators">
          Allocators
        </a>
      </b>
      <span style="display: flex; align-items: baseline; font-size: 13px;">
        <a target="_blank" href="https://github.com/davidgasquez/filecoin-metrics">
          <svg aria-roledescription="logo" aria-label="GitHub" viewBox="0 0 64 64" width="48" height="48" class="svelte-1jqst0j"><path d="M32,16c-8.8,0-16,7.2-16,16c0,7.1,4.6,13.1,10.9,15.2 c0.8,0.1,1.1-0.3,1.1-0.8c0-0.4,0-1.4,0-2.7c-4.5,1-5.4-2.1-5.4-2.1c-0.7-1.8-1.8-2.3-1.8-2.3c-1.5-1,0.1-1,0.1-1 c1.6,0.1,2.5,1.6,2.5,1.6c1.4,2.4,3.7,1.7,4.7,1.3c0.1-1,0.6-1.7,1-2.1c-3.6-0.4-7.3-1.8-7.3-7.9c0-1.7,0.6-3.2,1.6-4.3 c-0.2-0.4-0.7-2,0.2-4.2c0,0,1.3-0.4,4.4,1.6c1.3-0.4,2.6-0.5,4-0.5c1.4,0,2.7,0.2,4,0.5c3.1-2.1,4.4-1.6,4.4-1.6 c0.9,2.2,0.3,3.8,0.2,4.2c1,1.1,1.6,2.5,1.6,4.3c0,6.1-3.7,7.5-7.3,7.9c0.6,0.5,1.1,1.5,1.1,3c0,2.1,0,3.9,0,4.4 c0,0.4,0.3,0.9,1.1,0.8C43.4,45.1,48,39.1,48,32C48,23.2,40.8,16,32,16z"></path></svg>
        </a>
      </span>
    </div>
  </div>`,
  footer: false, // what to show in the footer (HTML)
  sidebar: false, // whether to show the sidebar
  toc: false, // whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
};
