import { defineConfig } from 'tinacms';

const linkList = (name: string, label: string) => ({
  type: 'object' as const,
  name,
  label,
  list: true,
  ui: { itemProps: (item: Record<string, string>) => ({ label: item?.label }) },
  fields: [
    { type: 'string' as const, name: 'label', label: 'Label' },
    { type: 'string' as const, name: 'href', label: 'URL' },
  ],
});

const quoteList = (name: string, label: string) => ({
  type: 'object' as const,
  name,
  label,
  list: true,
  ui: { itemProps: (item: Record<string, string>) => ({ label: item?.by }) },
  fields: [
    { type: 'string' as const, name: 'quote', label: 'Review text', ui: { component: 'textarea' } },
    { type: 'string' as const, name: 'by', label: 'Client name' },
  ],
});

const text = (name: string, label: string) => ({ type: 'string' as const, name, label, ui: { component: 'textarea' } });
const str = (name: string, label: string) => ({ type: 'string' as const, name, label });

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'settings',
        label: 'Site settings',
        path: 'content',
        format: 'json',
        match: { include: 'settings' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          str('name', 'Business name'),
          { type: 'image', name: 'logo', label: 'Logo' },
          str('phone', 'Phone (display)'),
          str('phoneHref', 'Phone link (tel:)'),
          str('quoteFormAction', 'Quote form endpoint'),
          {
            type: 'object',
            name: 'hours',
            label: 'Hours',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.days }) },
            fields: [str('days', 'Days'), str('time', 'Hours')],
          },
          {
            type: 'object',
            name: 'nav',
            label: 'Main navigation',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.label }) },
            fields: [
              str('label', 'Menu label'),
              str('short', 'Short label (header)'),
              { type: 'boolean', name: 'primary', label: 'Show in header' },
              str('href', 'URL'),
            ],
          },
          linkList('areas', 'Service areas'),
          linkList('social', 'Social links'),
          linkList('infoLinks', 'Footer links'),
          str('privacyHref', 'Privacy policy URL'),
          str('copyright', 'Copyright line'),
        ],
      },
      {
        name: 'home',
        label: 'Home page',
        path: 'content',
        format: 'json',
        match: { include: 'home' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          str('seoTitle', 'SEO title'),
          text('seoDescription', 'SEO description'),
          {
            type: 'object',
            name: 'hero',
            label: 'Hero',
            fields: [
              str('headline', 'Headline'),
              str('subhead', 'Sub-headline (H1 second line)'),
              text('lead', 'Lead paragraph'),
              str('quoteLabel', 'Quote button label'),
              str('plateNote', 'Drawing note'),
              {
                type: 'object',
                name: 'hotspots',
                label: 'Drawing hotspots',
                list: true,
                ui: { itemProps: (item: Record<string, string>) => ({ label: item?.label }) },
                fields: [
                  { type: 'string', name: 'id', label: 'Area', options: ['pool', 'patio', 'kitchen'] },
                  str('label', 'Label'),
                  str('href', 'URL'),
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'trust',
            label: 'Trust strip',
            list: true,
            ui: { itemProps: (item: Record<string, string>) => ({ label: item?.title }) },
            fields: [str('title', 'Title'), str('text', 'Supporting text')],
          },
          {
            type: 'object',
            name: 'paths',
            label: 'First pool / upgrade paths',
            fields: [
              str('title', 'Section title'),
              {
                type: 'object',
                name: 'first',
                label: 'First pool',
                fields: [str('title', 'Title'), text('text', 'Text'), text('quote', 'Quote'), str('by', 'Quote by')],
              },
              {
                type: 'object',
                name: 'upgrade',
                label: 'Upgrade',
                fields: [str('title', 'Title'), text('text', 'Text'), linkList('items', 'Links')],
              },
            ],
          },
          {
            type: 'object',
            name: 'design',
            label: '3D design',
            fields: [
              str('title', 'Title'),
              text('text', 'Text'),
              str('videoSrc', 'Video URL'),
              str('videoLabel', 'Video label'),
              str('caption', 'Drawing caption'),
            ],
          },
          {
            type: 'object',
            name: 'process',
            label: 'Process',
            fields: [
              str('title', 'Title'),
              {
                type: 'object',
                name: 'steps',
                label: 'Steps',
                list: true,
                ui: { itemProps: (item: Record<string, string>) => ({ label: item?.title }) },
                fields: [str('title', 'Title'), text('text', 'Text')],
              },
              text('quote', 'Quote'),
              str('by', 'Quote by'),
            ],
          },
          {
            type: 'object',
            name: 'services',
            label: 'Services',
            fields: [
              str('title', 'Title'),
              {
                type: 'object',
                name: 'items',
                label: 'Services',
                list: true,
                ui: { itemProps: (item: Record<string, string>) => ({ label: item?.title }) },
                fields: [
                  { type: 'string', name: 'id', label: 'Drawing area', options: ['pool', 'patio', 'kitchen'] },
                  str('title', 'Title'),
                  text('text', 'Text'),
                  str('linkLabel', 'Link label'),
                  str('href', 'URL'),
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'discount',
            label: 'Discount band',
            fields: [str('title', 'Title'), str('text', 'Text'), str('linkLabel', 'Button label')],
          },
          {
            type: 'object',
            name: 'proof',
            label: 'Reviews',
            fields: [
              str('title', 'Title'),
              {
                type: 'object',
                name: 'google',
                label: 'Google Guaranteed',
                fields: [str('title', 'Title'), text('text', 'Text')],
              },
              {
                type: 'object',
                name: 'featured',
                label: 'Featured review',
                fields: [text('quote', 'Quote'), str('by', 'Client name'), text('more', 'More from the same review')],
              },
              quoteList('reviews', 'Other reviews'),
            ],
          },
          {
            type: 'object',
            name: 'recent',
            label: 'Recent work',
            fields: [
              str('title', 'Title'),
              str('followLabel', 'Follow label'),
              str('followHref', 'Follow URL'),
              {
                type: 'object',
                name: 'items',
                label: 'Posts',
                list: true,
                ui: { itemProps: (item: Record<string, string>) => ({ label: item?.title }) },
                fields: [
                  text('title', 'Caption'),
                  { type: 'string', name: 'kind', label: 'Type', options: ['Post', 'Reel'] },
                  str('href', 'Instagram URL'),
                  { type: 'image', name: 'image', label: 'Photo (optional)' },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'financing',
            label: 'Financing',
            fields: [
              str('title', 'Title'),
              text('text', 'Text'),
              str('linkLabel', 'Button label'),
              str('href', 'Button URL'),
              str('partnersTitle', 'Partners title'),
              linkList('partners', 'Partners'),
            ],
          },
          {
            type: 'object',
            name: 'quote',
            label: 'Quote form',
            fields: [
              str('title', 'Title'),
              text('lead', 'Lead'),
              str('callTitle', 'Call heading'),
              { type: 'string', name: 'interests', label: 'Interest options', list: true },
              str('submitLabel', 'Submit label'),
            ],
          },
        ],
      },
    ],
  },
});
