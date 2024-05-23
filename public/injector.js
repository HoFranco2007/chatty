const injectReactApp = () => {
  const container = document.createElement('div');
  container.id = 'nextjs-chatty-container';
  document.body.appendChild(container);

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('chatty.bundle.js');
  script.onload = () => {
    console.log('Next.js chatty loaded');
  };
  document.head.appendChild(script);
};

injectReactApp();