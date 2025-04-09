/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from 'zod';

export const headerTypes = ['none', 'text', 'image', 'video'] as const;
export const buttonTypes = ['call', 'link', 'copy'] as const;

const SupportedLanguageEnum = z.enum([
  "af",
  "sq",
  "ar",
  "ar_EG",
  "ar_AE",
  "ar_LB",
  "ar_MA",
  "ar_QA",
  "az",
  "be_BY",
  "bn",
  "bn_IN",
  "bg",
  "ca",
  "zh_CN",
  "zh_HK",
  "zh_TW",
  "hr",
  "cs",
  "da",
  "prs_AF",
  "nl",
  "nl_BE",
  "en",
  "en_GB",
  "en_US",
  "en_AE",
  "en_AU",
  "en_CA",
  "en_GH",
  "en_IE",
  "en_IN",
  "en_JM",
  "en_MY",
  "en_NZ",
  "en_QA",
  "en_SG",
  "en_UG",
  "en_ZA",
  "et",
  "fil",
  "fi",
  "fr",
  "fr_BE",
  "fr_CA",
  "fr_CH",
  "fr_CI",
  "fr_MA",
  "ka",
  "de",
  "de_AT",
  "de_CH",
  "el",
  "gu",
  "ha",
  "he",
  "hi",
  "hu",
  "id",
  "ga",
  "it",
  "ja",
  "kn",
  "kk",
  "rw",
  "ko",
  "ky_KG",
  "lo",
  "lv",
  "lt",
  "mk",
  "ms",
  "ml",
  "mr",
  "nb",
  "ps_AF",
  "fa",
  "pl",
  "pt_BR",
  "pt_PT",
  "pa",
  "ro",
  "ru",
  "sr",
  "si_LK",
  "sk",
  "sl",
  "es",
  "es_AR",
  "es_CL",
  "es_CO",
  "es_CR",
  "es_DO",
  "es_EC",
  "es_HN",
  "es_MX",
  "es_PA",
  "es_PE",
  "es_ES",
  "es_UY",
  "sw",
  "sv",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "ur",
  "uz",
  "vi",
  "zu"
]);

export const whatsappTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  language: SupportedLanguageEnum,
  category: z.string().min(1, 'Category is required'),
  header: z.object({
    type: z.enum(headerTypes),
    value: z.string().optional(),
  }),
  body: z.object({
    text: z.string().min(1, 'Body text is required'),
    variables: z.array(z.object({
      id: z.number(),
      value: z.string().min(1, 'Sample text is required'),
    })),
  }),
  footer: z.string().optional(),
  buttons: z.array(z.object({
    type: z.enum(buttonTypes),
    text: z.string().min(1, 'Button text is required'),
    value: z.string().min(1, 'Button value is required'),
  })).max(3, 'Maximum 3 buttons allowed'),
}).superRefine((data, ctx) => {
  // Header validation
  if (data.header.type !== 'none' && !data.header.value) {
    ctx.addIssue({
      path: ['header', 'value'],
      code: z.ZodIssueCode.custom,
      message: 'Value is required when header type is not none',
    });
  }

  // Button link validation
  data.buttons.forEach((button, index) => {
    if (button.type === 'link') {
      try {
        new URL(button.value);
      } catch (e: any) {
        ctx.addIssue({
          path: ['buttons', index, 'value'],
          code: z.ZodIssueCode.custom,
          message: 'Invalid URL for link button',
        });
      }
    }
  });
});
