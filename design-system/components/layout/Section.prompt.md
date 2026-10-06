The page-building block. Every top-level section uses it, numbered in order, all on one left edge.
```jsx
<Section index="01" label="Selected engineering" title="Agent systems I have built." aside={<ArrowLink href="/work">All work</ArrowLink>}>…</Section>
```
- Content spans the 1080px container; use hm-split (7:5) or 3-col grids to fill it, hm-prose to cap reading width.
