# Intersection Observer Example

Using intersection observers can be a practical alternative to virtualization/windowing for rendering large lists. This app demonstrates how it works.

## Getting started

I assume you have Node.js installed, so

1. Clone the repo
2. Run `npm install`
3. Run `npm start`
4. Open up a browser to `http://localhost:3000`

## Use cases

You're still not going to get the performance you would out of something like [`react-window`](https://github.com/bvaughn/react-window) or [TanStack Virtual](https://tanstack.com/virtual/v3).

However these tools are built almost exclusively for flat lists, and neither consider the case where your item can change sizes _after_ it's rendered. Consider using intersection observers:

- for data that isn't flat (e.g. trees, graphs, etc)
- for list items that can change sizes after they are rendered (e.g. a user clicking a button that expands the container)
  - doing this with virtualization libraries requires you to recompute the height of the window and the offsets of all list items!
- if virtualization/windowing might be overkill for you -- this is a simpler, less-code solution comparatively
