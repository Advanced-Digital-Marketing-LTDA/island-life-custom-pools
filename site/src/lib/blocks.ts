// The section types an editor can put on a page. Tina's block list (tina/config.ts) and the renderer
// (src/components/Blocks.astro) must offer exactly these; scripts/test-site.mjs checks that they agree.
export const blockNames = [
  'hero', 'about', 'showcase', 'reviews', 'process', 'financing', 'quoteForm',
  'pageHero', 'overview', 'feature', 'collection', 'callToAction', 'heading', 'postList',
] as const;
export type BlockName = (typeof blockNames)[number];

export interface Block {
  _template: BlockName;
  hidden?: boolean;
  anchor?: string;
  [field: string]: unknown;
}

// Sections that sit under the transparent header. Any other first section gets a solid header.
export const overlayBlocks: readonly BlockName[] = ['hero'];
// Sections built to open a page: they clear the fixed header themselves. Anything else gets a spacer.
export const clearsHeader: readonly BlockName[] = ['hero', 'pageHero', 'heading'];
// Sections that other links point at by default (the header "Free quote" button goes to #quote).
export const defaultAnchors: Partial<Record<BlockName, string>> = { quoteForm: 'quote' };
