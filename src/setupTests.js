import React from 'react'
import {afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { JSDOM } from 'jsdom'

// Ensure React is defined for tests that rely on the classic JSX transform
globalThis.React = React

// Minimal localStorage mock for test environment
const _localStore = {}
const localStorageMock = {
  getItem: (key) => (_localStore[key] === undefined ? null : _localStore[key]),
  setItem: (key, value) => { _localStore[key] = String(value) },
  removeItem: (key) => { delete _localStore[key] },
  clear: () => { for (const k in _localStore) delete _localStore[k] },
}
globalThis.localStorage = localStorageMock

// Jest-like matchMedia mock for jsdom / vitest
if (typeof globalThis.matchMedia !== 'function') {
  globalThis.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

// If tests are executed with a runner that doesn't set up a DOM (e.g. bun's test runner), create one
if (!globalThis.document) {
  const dom = new JSDOM('<!doctype html><html><body></body></html>')
  globalThis.window = dom.window
  globalThis.document = dom.window.document
  globalThis.navigator = dom.window.navigator
  globalThis.HTMLElement = dom.window.HTMLElement
  globalThis.Node = dom.window.Node
  globalThis.getComputedStyle = dom.window.getComputedStyle
}

// Minimal requestAnimationFrame mock for testing environments
if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
}
if (typeof globalThis.cancelAnimationFrame !== 'function') {
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
}

// Load jest-dom matchers after we've created a JSDOM instance
await import('@testing-library/jest-dom/vitest')

// Cleanup after each test
afterEach(() => {
  cleanup()
})
