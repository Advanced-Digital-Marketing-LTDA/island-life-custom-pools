import { defineConfig } from 'tinacms';
import { blockNames } from '../src/lib/blocks';

type Item = Record<string, unknown>;
type Fields = any[];

const str = (name: string, label: string, description?: string) => ({ type: 'string' as const, name, label, description });
const text = (name: string, label: string, description?: string) => ({ type: 'string' as const, name, label, description, ui: { component: 'textarea' } });
const num = (name: string, label: string, description?: string) => ({ type: 'number' as const, name, label, description });
const image = (name: string, label: string) => ({ type: 'image' as const, name, label });
const strings = (name: string, label: string, description?: string) => ({ type: 'string' as const, name, label, description, list: true });
const items = (name: string, label: string, itemLabel: string, fields: Fields, description?: string) => ({
  type: 'object' as const,
  name,
  label,
  description,
  list: true,
  ui: { itemProps: (item: Item) => ({ label: item?.[itemLabel] as string }) },
  fields,
});
const group = (name: string, label: string, fields: Fields) => ({ type: 'object' as const, name, label, fields });
const links = (name: string, label: string, description?: string) =>
  items(name, label, 'label', [str('label', 'Label'), str('href', 'Link', '"#section" jumps to a section of the home page; "/page" opens another page.')], description);

// Titles are written as two lines: the first in the normal color, the second ("emphasis") in the accent color.
const heading = () => [str('title', 'Heading, first line'), str('titleEm', 'Heading, second line (accent color)')];
// The same two lines, where the first part can itself run over several lines (press Enter for a new line).
const headingLines = () => [
  text('title', 'Heading, first part', 'Press Enter to start a new line.'),
  str('titleEm', 'Heading, last line (accent color)', 'Optional.'),
];
const href = (name: string, label: string) =>
  str(name, label, 'Use "#name" for a section on this page, "/page" for another page, or "/#name" for a section on the home page.');

const singleton = (name: string, label: string, fields: Fields) => ({
  name,
  label,
  path: 'content',
  format: 'json' as const,
  match: { include: name },
  ui: { allowedActions: { create: false, delete: false } },
  fields,
});

// A new document's file name (its URL) is made from its title.
const slugifyFrom = (field: string) => (values: Record<string, unknown>) =>
  String(values?.[field] ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

// ---- Page sections ("blocks"). Each one is a design; its fields are its content. The names are the section
// types in src/lib/blocks.ts and the components in src/components/Blocks.astro.
const common: Fields = [
  str('anchor', 'Link name', 'A name other links can jump to: "about" makes "#about" work. Lowercase letters, numbers and dashes. Must be unique on the page.'),
  { type: 'boolean', name: 'hidden', label: 'Hide this section', description: 'Keeps the section here but does not show it on the site.' },
];
const labelOf = (item: Item) => {
  const first = ['title', 'line1', 'eyebrow', 'label', 'readLabel'].map((key) => item?.[key]).find((value) => typeof value === 'string' && value);
  return `${item?.hidden ? '(hidden) ' : ''}${((first as string) ?? '').replace(/\s*\n\s*/g, ' ')}`;
};
const block = (name: (typeof blockNames)[number], label: string, fields: Fields, defaultItem?: Item) => ({
  name,
  label,
  ui: { itemProps: (item: Item) => ({ label: `${label}${labelOf(item) ? ' — ' + labelOf(item) : ''}` }), defaultItem },
  fields: [...fields, ...common],
});

const templates = [
  block('hero', 'Hero: full-width photo', [
    image('image', 'Photo'), str('imageAlt', 'Photo description'),
    str('video', 'Background video (optional)', 'The file name in public/videos, for example "/videos/island-life-hero.mp4". A .webm file with the same name is used as a fallback.'),
    str('videoMobile', 'Smaller video for phones (optional)', 'For example "/videos/island-life-hero-mobile.mp4". Needs a .webm with the same name too.'),
    image('videoPoster', 'Still shown before the video loads, and when motion is reduced'),
    str('kicker', 'Line above the heading'),
    str('line1', 'Heading, line 1'), str('line2', 'Heading, line 2 (accent color)'), str('line3', 'Heading, line 3'),
    text('intro', 'Introduction'), str('cta', 'Button label'), href('ctaHref', 'Button link'),
    str('scrollLabel', 'Scroll link label'), href('scrollHref', 'Scroll link'), strings('foot', 'Bottom-right list'),
    { type: 'boolean', name: 'scrim', label: 'Dark band behind the text', description: 'Turn on for bright photos, so the text stays easy to read.' },
  ], { ctaHref: '#quote' }),
  block('about', 'About and services', [
    str('label', 'Small heading'), ...headingLines(), text('lede', 'Introduction'), image('image', 'Photo'), str('imageAlt', 'Photo description'),
    str('caption', 'Photo caption'),
    items('services', 'Services', 'title', [str('id', 'Link name', 'Links such as "#patios" jump to this row.'), str('title', 'Title'), text('description', 'Description')]),
    text('details', 'Closing note'), str('cta', 'Button label'), href('ctaHref', 'Button link'),
  ], { ctaHref: '#quote' }),
  block('showcase', 'Design gallery (three photos)', [
    str('label', 'Small heading'), ...heading(), text('intro', 'Introduction'),
    items('cards', 'Gallery items', 'name', [
      { type: 'string', name: 'layout', label: 'Position', description: 'The layout fits one of each.', options: ['pool', 'patio', 'kitchen'] },
      str('name', 'Title'), str('category', 'Tags'), str('detail', 'Caption'), image('image', 'Photo'), str('alt', 'Photo description'),
    ]),
    str('cta', 'Button label'), href('ctaHref', 'Button link'),
  ], { ctaHref: '#quote' }),
  block('reviews', 'Reviews (three at a time)', [
    str('label', 'Small heading'), text('title', 'Heading', 'Press Enter to start a new line.'),
    items('reviews', 'Reviews', 'name', [str('name', 'Client name'), str('detail', 'Detail line'), text('quote', 'Review')],
      'Each review is shown with five stars. They rotate by themselves, three at a time.'),
    str('cta', 'Button label'), href('ctaHref', 'Button link'),
  ], { ctaHref: '#quote' }),
  block('process', 'Steps', [
    str('label', 'Small heading'), ...headingLines(), text('intro', 'Introduction'), str('cta', 'Button label'), href('ctaHref', 'Button link'),
    items('steps', 'Steps', 'title', [str('title', 'Title'), text('description', 'Description')]),
  ], { ctaHref: '#quote' }),
  block('financing', 'Financing offer', [
    str('label', 'Small heading'), ...heading(), text('intro', 'Introduction'), str('partnersLabel', 'Partners heading'), strings('partners', 'Partners'),
    str('offerLabel', 'Offer small heading'), str('offerLine1', 'Offer heading, line 1'), str('offerLine2', 'Offer heading, line 2'),
    strings('possibilities', 'What it can cover'), text('note', 'Note'), str('discountTitle', 'Discount heading'), text('discountText', 'Discount text'),
    str('cta', 'Button label'), href('ctaHref', 'Button link'),
  ], { ctaHref: '#quote' }),
  block('quoteForm', 'Quote form', [], { anchor: 'quote' }),
  block('pageHero', 'Page opening: title and photo', [
    str('homeLabel', 'Breadcrumb home label'), str('eyebrow', 'Breadcrumb page name'), str('title', 'Heading, first line'),
    str('italicTitle', 'Heading, second line (accent color)'), text('introduction', 'Introduction'), str('ctaLabel', 'Button label'), href('ctaHref', 'Button link'),
    image('image', 'Photo'), str('imageAlt', 'Photo description'), str('scrollLabel', 'Scroll link label'), href('scrollHref', 'Scroll link'),
  ], { homeLabel: 'Home', ctaHref: '#quote', scrollHref: '#overview' }),
  block('overview', 'Overview with checklist', [str('label', 'Small heading'), str('title', 'Heading'), text('lede', 'Text'), strings('checklist', 'Checklist')], { anchor: 'overview' }),
  block('feature', 'Photo and text band', [
    image('image', 'Photo'), str('imageAlt', 'Photo description'), str('eyebrow', 'Small heading'), str('title', 'Heading'), text('text', 'Text'),
    str('linkLabel', 'Link label'), href('linkHref', 'Link'),
  ], { linkHref: '#quote' }),
  block('collection', 'Photo collection', [
    str('label', 'Small heading'), ...heading(), text('intro', 'Introduction'), str('linkLabel', 'Link label (end of the introduction)'), href('linkHref', 'Link'),
    items('photos', 'Gallery items', 'title', [
      {
        type: 'string', name: 'layout', label: 'Position',
        description: 'How the photo sits in the grid. Alternate wide or feature photos with pairs of portrait, portrait-offset, landscape-left and landscape-right photos to keep the rhythm.',
        options: ['feature', 'wide', 'portrait', 'portrait-offset', 'landscape-left', 'landscape-right'],
      },
      str('title', 'Title'), str('category', 'Tags'), text('description', 'Description'), image('image', 'Photo'), str('alt', 'Photo description'),
      str('position', 'Crop focus (optional)', 'Where the crop is anchored, for example "center top" or "60% center". Defaults to the center.'),
    ]),
  ]),
  block('callToAction', 'Call to action band', [
    str('label', 'Small heading'), ...heading(), text('text', 'Text'), str('button', 'Button label'), href('buttonHref', 'Button link'),
    str('callLabel', 'Phone label', 'Shown before the phone number from Site settings, with the first row of the footer hours. Leave empty to hide the phone line.'),
  ], { buttonHref: '/#quote' }),
  block('heading', 'Page title (blog style)', [str('label', 'Small heading'), ...heading(), text('intro', 'Introduction')]),
  block('postList', 'Blog article list', [str('readLabel', 'Article link label')], { readLabel: 'Read the article' }),
  block('panorama', 'Heading, wide photo and text', [
    ...headingLines(), image('image', 'Photo'), str('imageAlt', 'Photo description'), text('text', 'Text'), str('cta', 'Button label'), href('ctaHref', 'Button link'),
  ], { ctaHref: '#quote' }),
  block('spotlight', 'Heading, photo, text and button', [
    ...headingLines(), image('image', 'Photo'), str('imageAlt', 'Photo description'), text('text', 'Text'), str('buttonLabel', 'Button label'), href('buttonHref', 'Button link'),
  ], { buttonHref: '#quote' }),
  block('trust', 'Trust badge and statement', [
    str('badgeLine1', 'Badge text, line 1'), str('badgeLine2', 'Badge text, line 2'), str('title', 'Heading'), text('text', 'Text'),
    str('cta', 'Button label'), href('ctaHref', 'Button link'),
  ], { ctaHref: '#quote' }),
  block('splitHero', 'Page opening: text, button and photo', [
    str('homeLabel', 'Breadcrumb home label'), str('eyebrow', 'Breadcrumb page name'), ...headingLines(), text('text', 'Introduction'),
    str('buttonLabel', 'Button label'), href('buttonHref', 'Button link'), image('image', 'Photo'), str('imageAlt', 'Photo description'),
  ], { homeLabel: 'Home', buttonHref: '#payment-estimator' }),
  block('estimator', 'Monthly payment estimator', [
    str('label', 'Small heading'), ...headingLines(), text('intro', 'Introduction'), text('note', 'Note under the results'),
    num('amount', 'Starting loan amount ($)', 'What the visitor sees before changing anything.'), num('rate', 'Starting interest rate (%)'), num('years', 'Starting term (years)'),
    { type: 'string', name: 'background', label: 'Background color', description: 'White sets the estimator apart from a sand-colored section above it.', options: ['sand', 'white'] },
    str('cta', 'Button label'), href('ctaHref', 'Button link'),
  ], { amount: 46400, rate: 8, years: 15, ctaHref: '#quote' }),
  block('lenders', 'Financing partners', [
    str('label', 'Small heading'), ...headingLines(), text('intro', 'Introduction'),
    items('lenders', 'Partners', 'name', [str('name', 'Name'), text('description', 'Description'), str('href', 'Website address'), str('label', 'Link label')]),
  ]),
];

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
        image('ogImage', 'Link preview image', 'The photo shown when a page is shared in a message or on social media.'),
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
          str('copyright', 'Copyright name', 'Shown after © and the current year.'),
          str('tagline', 'Bottom line'),
          str('credit', 'Credit line', 'Small text at the very bottom of every page. Leave empty to hide it.'),
          str('creditHref', 'Credit link', 'Where the credit line goes when clicked. Leave empty for plain text.'),
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
          text('successText', 'Thank-you text after the reference number', 'Use {method} where “email” or “phone” should appear.'),
          str('successButton', 'Send another request label'),
        ]),
      ]),

      {
        name: 'pages',
        label: 'Pages',
        path: 'content/pages',
        format: 'json',
        ui: {
          // Pages are flat files: the file name is the address, so no folders.
          allowedActions: { createNestedFolder: false },
          filename: { slugify: slugifyFrom('seoTitle') },
          defaultItem: () => ({ seoTitle: 'New page', blocks: [] }),
        },
        fields: [
          { ...str('seoTitle', 'Page title', 'Also the title in search results and browser tabs. The file name becomes the page address: "patios" is /patios. The page named "home" is the front page: never delete it, or the site stops building.'), isTitle: true, required: true },
          text('seoDescription', 'Search description'),
          {
            type: 'object',
            name: 'blocks',
            label: 'Sections',
            description: 'Drag to reorder. Add, hide or delete sections to change the page. A page opens best with a hero, a page opening or a page title.',
            list: true,
            ui: { visualSelector: false },
            templates,
          },
        ],
      },

      singleton('blog', 'Blog article text', [
        str('backLabel', 'Back link label'),
        str('tocLabel', 'Contents heading'),
        str('ctaPrompt', 'Closing question'),
        str('ctaLink', 'Closing link label'),
        group('author', 'Author box', [
          str('label', 'Small heading'),
          str('name', 'Name'),
          str('role', 'Role'),
          text('bio', 'Bio'),
          str('link', 'Link label'),
        ]),
      ]),

      {
        name: 'posts',
        label: 'Blog articles',
        path: 'content/posts',
        format: 'json',
        ui: { filename: { slugify: slugifyFrom('title') } },
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
