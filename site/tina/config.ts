import { defineConfig } from 'tinacms';

type Item = Record<string, string>;

const str = (name: string, label: string, description?: string) => ({ type: 'string' as const, name, label, description });
const text = (name: string, label: string, description?: string) => ({ type: 'string' as const, name, label, description, ui: { component: 'textarea' } });
const image = (name: string, label: string) => ({ type: 'image' as const, name, label });
const strings = (name: string, label: string, description?: string) => ({ type: 'string' as const, name, label, description, list: true });
const items = (name: string, label: string, itemLabel: string, fields: any[], description?: string) => ({
  type: 'object' as const,
  name,
  label,
  description,
  list: true,
  ui: { itemProps: (item: Item) => ({ label: item?.[itemLabel] }) },
  fields,
});
const links = (name: string, label: string, description?: string) =>
  items(name, label, 'label', [str('label', 'Label'), str('href', 'Link', '"#section" jumps to a section of the home page; "/page" opens another page.')], description);
const group = (name: string, label: string, fields: any[]) => ({ type: 'object' as const, name, label, fields });

// Titles are written as two lines: the first in the normal color, the second ("emphasis") in the accent color.
const heading = (prefix = '') => [str(`${prefix}title`, 'Heading, first line'), str(`${prefix}titleEm`, 'Heading, second line (accent color)')];

const singleton = (name: string, label: string, fields: any[]) => ({
  name,
  label,
  path: 'content',
  format: 'json' as const,
  match: { include: name },
  ui: { allowedActions: { create: false, delete: false } },
  fields,
});

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },
  schema: {
    collections: [
      singleton('settings', 'Site settings', [
        str('name', 'Business name'),
        image('logo', 'Logo'),
        str('phone', 'Phone (as shown)'),
        str('phoneHref', 'Phone link', 'The tel: link, for example tel:+18323044092.'),
        links('nav', 'Main menu', 'Header and mobile menu.'),
        str('headerCta', 'Header button label'),
        str('menuCta', 'Mobile menu button label'),
        group('footer', 'Footer', [
          str('blurbLine1', 'Tagline, first line'),
          str('blurbLine2', 'Tagline, second line'),
          links('nav', 'Footer links'),
          str('areasTitle', 'Service areas heading'),
          strings('areas', 'Service areas'),
          str('hoursTitle', 'Hours heading'),
          items('hours', 'Hours', 'days', [str('days', 'Days'), str('time', 'Hours')]),
          str('wordmark', 'Large wordmark'),
          str('copyright', 'Copyright name', 'Shown after © and the current year.'),
          str('tagline', 'Bottom line'),
        ]),
        links('social', 'Social and review links', 'Used for search engines; not shown on the page. Links with "review" in the label are left out.'),
        group('quote', 'Quote form (every page)', [
          str('label', 'Small heading'),
          str('titleLine', 'Heading, first line'),
          str('titleEm', 'Heading, second line (accent color)'),
          text('intro', 'Introduction'),
          str('callLabel', 'Phone call label'),
          text('discount', 'Discount note'),
          strings('interests', 'Project choices', 'The "I’m interested in" list. The form and the server accept exactly these.'),
          str('submitLabel', 'Send button label'),
          str('submitPendingLabel', 'Send button label while sending'),
          text('note', 'Note under the button'),
          text('errorText', 'Error message', 'Use {phone} where the phone number should appear.'),
          str('successLabel', 'Thank-you small heading'),
          str('successTitleLine', 'Thank-you heading, first line'),
          str('successTitleEm', 'Thank-you heading, second line (accent color)'),
          str('successLead', 'Thank-you text before the reference number'),
          text('successText', 'Thank-you text after the reference number'),
          str('successButton', 'Send another request label'),
        ]),
      ]),

      singleton('home', 'Home page', [
        str('seoTitle', 'Search title'),
        text('seoDescription', 'Search description'),
        group('hero', 'Hero', [
          image('image', 'Photo'),
          str('imageAlt', 'Photo description'),
          str('kicker', 'Line above the heading'),
          str('line1', 'Heading, line 1'),
          str('line2', 'Heading, line 2 (accent color)'),
          str('line3', 'Heading, line 3'),
          text('intro', 'Introduction'),
          str('cta', 'Button label'),
          str('scrollLabel', 'Scroll link label'),
          strings('foot', 'Bottom-right list'),
        ]),
        group('studio', 'About and services', [
          str('label', 'Small heading'),
          ...heading(),
          text('lede', 'Introduction'),
          image('image', 'Photo'),
          str('imageAlt', 'Photo description'),
          str('caption', 'Photo caption'),
          items('services', 'Services', 'title', [
            str('id', 'Link name', 'Menu links such as "#patios" jump to this. Change it only together with the menu.'),
            str('title', 'Title'),
            text('description', 'Description'),
          ]),
          text('details', 'Closing note'),
        ]),
        group('projects', 'Design gallery', [
          str('label', 'Small heading'),
          ...heading(),
          text('intro', 'Introduction'),
          items('items', 'Gallery items', 'name', [
            { type: 'string', name: 'layout', label: 'Position', description: 'The gallery is laid out for one of each.', options: ['pool', 'patio', 'kitchen'] },
            str('name', 'Title'),
            str('category', 'Tags'),
            str('detail', 'Caption'),
            image('image', 'Photo'),
            str('alt', 'Photo description'),
          ]),
        ]),
        group('testimonial', 'Reviews', [
          str('label', 'Small heading'),
          str('googleTitle', 'Google badge title'),
          str('googleText', 'Google badge text'),
          items('reviews', 'Reviews', 'name', [str('name', 'Client name'), str('detail', 'Detail line'), text('quote', 'Review')]),
          strings('assurances', 'Promises under the reviews'),
        ]),
        group('process', 'Process', [
          str('label', 'Small heading'),
          ...heading(),
          items('steps', 'Steps', 'title', [
            str('title', 'Title'),
            text('description', 'Description'),
            str('meta', 'Tags'),
            image('image', 'Photo'),
            str('alt', 'Photo description'),
          ]),
        ]),
        group('investment', 'Financing', [
          str('label', 'Small heading'),
          ...heading(),
          text('intro', 'Introduction'),
          str('partnersLabel', 'Partners heading'),
          strings('partners', 'Partners'),
          str('offerLabel', 'Offer small heading'),
          str('offerLine1', 'Offer heading, line 1'),
          str('offerLine2', 'Offer heading, line 2'),
          strings('possibilities', 'What it can cover'),
          text('note', 'Note'),
          str('discountTitle', 'Discount heading'),
          text('discountText', 'Discount text'),
          str('cta', 'Button label'),
        ]),
      ]),

      singleton('pools', 'Pools page', [
        str('seoTitle', 'Search title'),
        text('seoDescription', 'Search description'),
        str('homeLabel', 'Breadcrumb home label'),
        str('eyebrow', 'Breadcrumb page name'),
        str('title', 'Heading, first line'),
        str('italicTitle', 'Heading, second line (accent color)'),
        text('introduction', 'Introduction'),
        str('heroCta', 'Button label'),
        image('heroImage', 'Top photo'),
        str('heroImageAlt', 'Top photo description'),
        str('scrollLabel', 'Scroll link label'),
        str('overviewLabel', 'Overview small heading'),
        str('overviewTitle', 'Overview heading'),
        text('overview', 'Overview text'),
        strings('considerations', 'Checklist'),
        image('detailImage', 'Second photo'),
        str('detailImageAlt', 'Second photo description'),
        str('detailEyebrow', 'Second section small heading'),
        str('detailTitle', 'Second section heading'),
        text('detail', 'Second section text'),
        str('detailLink', 'Link label'),
      ]),

      singleton('blog', 'Journal page', [
        str('seoTitle', 'Search title'),
        text('seoDescription', 'Search description'),
        str('label', 'Small heading'),
        str('title', 'Heading, first line'),
        str('titleEm', 'Heading, second line (accent color)'),
        text('intro', 'Introduction'),
        str('readLabel', 'Article link label'),
        str('backLabel', 'Back link label (on articles)'),
        str('tocLabel', 'Contents heading (on articles)'),
        str('ctaPrompt', 'Closing question (on articles)'),
        str('ctaLink', 'Closing link label (on articles)'),
        group('author', 'Author box (on articles)', [
          str('label', 'Small heading'),
          str('name', 'Name'),
          str('role', 'Role'),
          text('bio', 'Bio'),
          str('link', 'Link label'),
        ]),
      ]),

      {
        name: 'posts',
        label: 'Journal articles',
        path: 'content/posts',
        format: 'json',
        ui: {
          filename: {
            slugify: (values: Record<string, unknown>) =>
              String(values?.title ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80),
          },
        },
        fields: [
          { type: 'datetime', name: 'date', label: 'Date', required: true, description: 'Only used to put the newest article first.' },
          str('category', 'Category'),
          { ...str('title', 'Title'), isTitle: true, required: true },
          text('excerpt', 'Summary'),
          image('image', 'Photo'),
          str('imageAlt', 'Photo description'),
          str('seoTitle', 'Search title'),
          text('seoDescription', 'Search description'),
          items('sections', 'Sections', 'title', [
            str('id', 'Link name', 'Lowercase letters and dashes, unique in this article. Used by the contents list.'),
            str('title', 'Heading'),
            items('paragraphs', 'Paragraphs', 'text', [text('text', 'Paragraph')]),
            strings('bullets', 'Bullet list (optional)'),
          ]),
        ],
      },
    ],
  },
});
