//////////////////////////////////////////////////////////////////////////////////////////////////////////
// JEST SETUP
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const { getBrowser, closeOpenBrowsers } = require('./chromium-controller')

jest.setTimeout(60000) // because we need to boot up an actual browser
afterAll(closeOpenBrowsers);

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const wait = (time = 0) => new Promise(r => setTimeout(r, time))

const openPalette = async (page) => {
  await wait(2000) // for page to have become idle
  
  // SHIFT+CTRL+SPACE
  await page.evaluate(() => document.dispatchEvent(
    new KeyboardEvent("keyup", {
      bubbles: true,
      cancelable: true,
      code: "Space",
      composed: true,
      ctrlKey: true,
      key: " ",
      keyCode: 32,
      metaKey: false,
      shiftKey: true,
      type: "keydown",
      which: 32,
  })))
  
  await wait(1000) // for tool to open
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// RUN TESTS
//////////////////////////////////////////////////////////////////////////////////////////////////////////

test(`Should open when user SHIFT+CTRL+SPACE`, async () => {
  const { page } = await getBrowser()

  let classList;

  classList = await page.evaluate(() => document.querySelector('#--command-palette-container--').classList.value)
  expect(classList).toEqual("__palette-container __palette-closed") // closed
  
  await openPalette(page)

  classList = await page.evaluate(() => document.querySelector('#--command-palette-container--').classList.value)
  expect(classList).toEqual("__palette-container") // open
});


test(`Should autofocus input and allow the user to filter options`, async () => {
  const { page } = await getBrowser()
  
  await openPalette(page) // this part should trigger the auto focus so we can type below

  const { options } = await page.evaluate(async () => {
    const input = document.querySelector('#--command-palette-input--');
    input.value = "zoom"
    input.dispatchEvent(new InputEvent('input')) // kick off the input event to simulate typing

    await new Promise(r => setTimeout(r, 500)) // wait for DOM to update
    return { options: document.querySelector('#--command-palette-container-- ul').innerText }
  })

  expect(options).toEqual("Zoom In\nZoom Out")
});
