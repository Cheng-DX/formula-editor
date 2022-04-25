import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    [
      'btn',
      'px-4 py-1 border rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
    [
      'icon-btn',
      'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
    ],
    ['flex-center', 'display-flex justify-center items-center'],
  ],
  rules: [
    [
      'scroll-y',
      {
        'overflow-y': 'scroll',
      },
    ],
    [
      'scroll-x',
      {
        'overflow-x': 'scroll',
      },
    ],
    [/^wp-(\d+)$/, ([, d]) => ({ width: `${d}%` })],
    [/^hp-(\d+)$/, ([, d]) => ({ height: `${d}%` })],
    [/^r-(\d+)$/, ([, d]) => ({ 'border-radius': `${d}px` })],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        carbon: () =>
          import('@iconify-json/carbon/icons.json').then(i => i.default as any),
      },
    }),
    presetWebFonts({
      fonts: {
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
